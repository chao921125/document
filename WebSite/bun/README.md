# 是真的快啊！！！！！！
让我们一起学习吧。
# bun的[官网](https://bun.sh/)
# 1、认识bun（官网都有介绍，可以自行观看），重要的是安装及运行
```text
Bun 是用于 JavaScript 和 TypeScript 应用程序的多合一工具包。它作为一个名为 .bun

其核心是 Bun 运行时，这是一个快速的 JavaScript 运行时，旨在作为 Node.js 的直接替代品。它是用 Zig 编写的，并由 JavaScriptCore 提供支持，大大减少了启动时间和内存使用。
```
# 2、bun目前的功能
```text
速度。Bun 进程的启动速度比 Node.js 快 4 倍（自己试试吧！
TypeScript 和 JSX 支持。可以直接执行 、 和 文件;Bun 的转译器在执行之前将这些转换为普通的 JavaScript。.jsx.ts.tsx
ESM 和 CommonJS 兼容性。世界正在向 ES 模块 （ESM） 发展，但 npm 上的数百万个包仍然需要 CommonJS。Bun 推荐 ES 模块，但支持 CommonJS。
Web 标准 API。Bun 实现了标准的 Web API，如 、 和 。Bun 由 Apple 为 Safari 开发的 JavaScriptCore 引擎提供支持，因此一些 API（如 Headers 和 URL）直接使用 Safari 的实现。fetchWebSocketReadableStream
Node.js 兼容性。除了支持 Node 风格的模块解析外，Bun 还旨在与内置的 Node.js 全局变量（， ） 和模块 （， ， 等） 完全兼容。这是一项持续不断的努力，尚未完成。有关当前状态，请参阅兼容性页面。processBufferpathfshttp
```
# 3、安装
```shell
# macOS 和 Linux
curl -fsSL https://bun.sh/install | bash # 建议使用

brew tap oven-sh/bun # 建议使用
brew install bun # 建议使用

npm install -g bun # 不推荐使用或者
# 其他安装方式暂不推荐（既然是node的替代，那么npm安装方式也不推荐使用）

# Windows
# Bun 为 Windows 提供了一个有限的实验性本机版本。目前，仅支持 Bun 运行时。

# 升级 安装后，二进制文件可以自行升级。
bun upgrade

brew upgrade bun

# 卸载
rm -rf ~/.bun

brew uninstall bun

npm uninstall -g bun
```
# 4、使用
```shell
bun init # 初始化

bun <file> # 运行文件：既可以是ts又可以是js直接运行即可

bun run start # 运行命令：需要在package.json文件中配置 "scripts"

bun add figlet
bun add -d @types/figlet # 安装包：

bun add -d bun-types # 内置支持TypeScript
```
##### TS 支持 tsconfig.json
```json
{
  "compilerOptions": {
    // add Bun type definitions
    "types": ["bun-types"],

    // enable latest features
    "lib": ["ESNext"],
    "module": "esnext",
    "target": "esnext",

    // if TS 5.x+
    "moduleResolution": "bundler",
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "moduleDetection": "force",
    // if TS 4.x or earlier
    // "moduleResolution": "nodenext",

    "jsx": "react-jsx", // support JSX
    "allowJs": true, // allow importing `.js` from `.ts`

    // best practices
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "composite": true,
    "downlevelIteration": true,
    "allowSyntheticDefaultImports": true
  }
}
```
# 5、颠覆npm，使用bun进行包管理，不再需要额外的ncu包进行包更新，很赞很强大
```shell
bun install # 安装包

bun add <pkg> # 安装包：-D

bun remove <pkg> # 运行命令：需要在package.json文件中配置 "scripts"

bun update # 更新包版本
```
# 999、FAQ
```text
Q：我可以将 Bun 与我现有的 Node.js 项目一起使用吗？

A：是的，Bun被设计为Node.js的直接替代品1.它原生实现了数百个 Node.js 和 Web API。但是，您应该知道，虽然 Bun 的目标是与 Node.js 完全兼容，但您现有的 Node.js 项目中可能存在某些功能或特定的第三方模块尚不支持或与 Bun 完全兼容。确保在迁移到 Bun 后对应用程序进行广泛测试，以确保一切按预期工作。

请注意，虽然大多数用户报告 Node.js 和 Bun 之间的过渡更平滑，但在某些情况下，用户在使用某些框架和依赖项实现 Bun 时遇到了挑战，例如 Next.js 的情况2以及特定的 NestJS 依赖项。

无论如何，仍然建议先在非生产环境中试用 Bun，或者从项目的一部分开始，然后逐步迁移其余部分。这样，任何兼容性问题都可以以可控的方式解决。
```
