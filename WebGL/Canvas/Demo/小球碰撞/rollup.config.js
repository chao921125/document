import path from 'path';
import { nodeResolve, DEFAULTS } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import builtins from 'rollup-plugin-node-builtins';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import replace from '@rollup/plugin-replace';
import cleaner from 'rollup-plugin-cleaner';
import eslint from '@rollup/plugin-eslint';
import camelcase from 'camelcase';
import pkg from './package.json';

const libraryName = 'ball-collision';
const libraryNamePascalCase = camelcase(libraryName, { pascalCase: true });
const isProd = process.env.NODE_ENV === 'production';

/**
 * rollup 配置
 * @param {String} module 'es' | 'cjs' | 'umd'
 */
function createRollupConfig(module) {
  const config = {
    input: `src/index.ts`,
    watch: {
      include: 'src/**',
    },
    plugins: [
      isProd &&
        module === 'es' &&
        cleaner({
          targets: ['./dist/'],
        }),
      /**
       * https://github.com/rollup/plugins/tree/master/packages/eslint
       * - 注意放到靠前位置
       */
      module === 'es' &&
        eslint({
          fix: true,
          include: ['src/**/*.{js?(x),ts?(x)}'],
        }),
      builtins(),
      url(),
      nodeResolve({
        extensions: [...DEFAULTS.extensions, '.ts'],
        mainFields: ['browser', 'jsnext:main', 'module', 'main'],
      }),
      commonjs(),
      alias({
        entries: {
          '@': path.resolve(__dirname, 'src'),
        },
      }),
      json(),
      replace({
        values: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        preventAssignment: true,
      }),
      babel({
        babelHelpers: 'runtime',
        extensions: [...DEFAULT_EXTENSIONS, '.ts'],
        /**
         * Babel 编译时，会处理 core-js（未来可能会被修复），
         * 导致 polyfill 内部代码发生了变化，产生一些微小的影响，如 Symbol 问题。
         * 暂时我们手动声明略过。
         * https://github.com/zloirock/core-js/issues/514
         * https://github.com/rails/webpacker/pull/2031
         */
        exclude: [/node_modules/, /node_modules[\\/]core-js/],
        assumptions: {
          /**
           * https://babeljs.io/docs/en/assumptions#setpublicclassfields
           *
           * 装饰器的 legancy: true，依赖此配置
           *  - https://babeljs.io/docs/en/babel-plugin-proposal-decorators#legacy
           */
          setPublicClassFields: true,
        },
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
            },
          ],
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              // react 17+ 新的运行时
              runtime: 'automatic',
            },
          ],
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: {
                version: 3,
                proposals: true,
              },
              useESModules: module === 'es',
              version: require('@babel/runtime-corejs3/package.json').version,
            },
          ],
          [
            // @babel/plugin-proposal-decorators 需要在 @babel/plugin-proposal-class-properties 之前
            '@babel/plugin-proposal-decorators',
            {
              legacy: true, // 推荐
            },
          ],
          ['@babel/plugin-proposal-class-properties'],
        ],
      }),
      isProd && filesize(),
      /**
       * - cjs、es 模块，第三方依赖不编译到产物中
       *  dependencies、peerDependencies 依赖都将被自动加入到 externals 中
       *  https://github.com/pmowrer/rollup-plugin-peer-deps-external#readme
       * - umd 模块，仅将 peerDependencies 自动加入到 externals 中（dependencies 依赖将被编译到产物中）
       *  https://github.com/pmowrer/rollup-plugin-peer-deps-external#readme
       *  因此你需要：
       *    - 在 package.json/peerDependencies 中明确指定哪些依赖包不想要被打包
       *    - 并且，将不想要打包的依赖在上方的 output globals 配置中，添加外部引入时的全局对象名
       */
      peerDepsExternal({
        includeDependencies: module !== 'umd',
      }),
      isProd &&
        module === 'umd' &&
        terser({
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
            drop_debugger: true,
            drop_console: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            // 移除注释
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
            // 不美化输出
            beautify: false,
          },
        }),
    ].filter(Boolean),
  };

  switch (module) {
    case 'es':
      config.output = {
        file: pkg.module,
        format: 'es',
        exports: 'named',
        sourcemap: true,
      };
      break;
    case 'cjs':
      config.output = {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      };
      break;
    case 'umd':
      config.output = {
        file: pkg.unpkg,
        format: 'umd',
        name: libraryNamePascalCase,
        // 不想要打包到产物的第三方依赖，在此处声明外部引入时的全局对象名
        // https://www.rollupjs.org/guide/en/#outputglobals
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        sourcemap: true,
      };
      break;
    default:
      break;
  }

  return config;
}

export default ['es', 'cjs', 'umd'].map(module => createRollupConfig(module));
