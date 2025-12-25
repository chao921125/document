// rollup.config.js
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
export default {
  input: ['./share/index.js'],
  output: {
    file: './dist/index.js',
    format: 'esm',
    name: 'qcdn',
  },
  plugins: [json(), nodeResolve(), commonjs(), terser()],
}
