### 浏览器跨域
###### 问题
```text
什么是跨域
为什么会跨域
为什么有跨域限制
怎么解决跨域
```
###### 答案及解析
```text
关键词：1、CORS；2、同源策略

跨域问题的来源是浏览器为了请求安全而引入的基于同源策略的安全特性。
当页面和请求的协议、主机名或端口不同时，浏览器判定两者不同源，即为跨域请求。
需要注意的是跨域是浏览器的限制，服务端并不受此影响。
当产生跨域时，我们可以通过JSONP、CORS、postMessage、Proxy等方式解决。

1. 跨域问题的来源
跨域问题的来源是浏览器为了请求安全而引入的基于**同源策略（Same-origin policy）**的安全特性。同源策略是浏览器一个非常重要的安全策略，基于这个策略可以限制非同源的内容与当前页面进行交互，从而减少页面被攻击的可能性。
当页面和请求的协议、主机名或端口不同时，浏览器判定两者不同源，从而产生跨域。需要注意的是跨域是浏览器的限制，实际请求已经正常发出和响应了。

2. 如何判定跨域
一个 origin 由协议（Protocol）、主机名（Host）和端口（Port）组成，这三块也是同源策略的判定条件，只有当协议、主机名和端口都相同时，浏览器才判定两者是同源关系，否则即为跨域。
3. 跨域的解决方案
前端常见的跨域解决方案有 CORS、反向代理（Reverse Proxy）、JSONP 等。

3.1 CORS (Cross-Origin Resource Sharing)
CORS 是目前最为广泛的解决跨域问题的方案。方案依赖服务端/后端在响应头中添加 Access-Control-Allow-* 头，告知浏览器端通过此请求。

涉及到的端

CORS 只需要服务端/后端支持即可，不涉及前端改动。

具体实现方式

CORS 将请求分为简单请求（Simple Requests）和需预检请求（Preflighted requests），不同场景有不同的行为：

简单请求

不会触发预检请求的称为简单请求。当请求满足以下条件时就是一个简单请求：

请求方法：GET、HEAD、POST。
请求头：Accept、Accept-Language、Content-Language、Content-Type。
Content-Type 仅支持：application/x-www-form-urlencoded、multipart/form-data、text/plain。
需预检请求

当一个请求不满足以上简单请求的条件时，浏览器会自动向服务端发送一个 OPTIONS 请求，通过服务端返回的 Access-Control-Allow-* 判定请求是否被允许。

CORS 引入了以下几个以 Access-Control-Allow-* 开头：

Access-Control-Allow-Origin 表示允许的来源
Access-Control-Allow-Methods 表示允许的请求方法
Access-Control-Allow-Headers 表示允许的请求头
Access-Control-Allow-Credentials 表示允许携带认证信息
当请求符合响应头的这些条件时，浏览器才会发送并响应正式的请求。

3.2 反向代理
反向代理解决跨域问题的方案依赖同源的服务端对请求做一个转发处理，将请求从跨域请求转换成同源请求。

涉及到的端

反向代理只需要服务端/后端支持，几乎不涉及前端改动，只用切换接口即可。

具体实现方式

反向代理的实现方式为在页面同域下配置一套反向代理服务，页面请求同域的服务端，服务端请求上游的实际的服务端，之后将结果返回给前端。

3.3 JSONP
JSONP 是一个相对古老的跨域解决方案。主要是利用了浏览器加载 JavaScript 资源文件时不受同源策略的限制而实现跨域获取数据。

涉及到的端

JSONP 需要服务端和前端配合实现。

具体实现方式

JSONP 的原理是利用了浏览器加载 JavaScript 资源文件时不受同源策略的限制而实现的。具体流程如下：

全局注册一个函数，例如：window.getHZFEMember = (num) => console.log('HZFE Member: ' + num);。
构造一个请求 URL，例如：https://hzfe.org/api/hzfeMember?callback=getHZFEMember。
生成一个 <script> 并把 src 设为上一步的请求 URL 并插入到文档中，如 <script src="https://hzfe.org/api/hzfeMember?callback=getHZFEMember" />。
服务端构造一个 JavaScript 函数调用表达式并返回，例如：getHZFEMember(17)。
浏览器加载并执行以上代码，输出 HZFE Member: 17。
非常用方式
postMessage
即在两个 origin 下分别部署一套页面 A 与 B，A 页面通过 iframe 加载 B 页面并监听消息，B 页面发送消息。
window.name
主要是利用 window.name 页面跳转不改变的特性实现跨域，即 iframe 加载一个跨域页面，设置 window.name，跳转到同域页面，可以通过 $('iframe').contentWindow.name 拿到跨域页面的数据。
document.domain
可将相同一级域名下的子域名页面的 document.domain 设置为一级域名实现跨域。
可将同域不同端口的 document.domain 设置为同域名实现跨域（端口被置为 null）。

1. LocalStorage / SessionStorage 跨域
LocalStorage 和 SessionStorage 同样受到同源策略的限制。而跨域读写的方式也可以使用前文提到的 postMessage。

2. 跨域与监控
前端项目在统计前端报错监控时会遇到上报的内容只有 Script Error 的问题。这个问题也是由同源策略引起。在 <script> 标签上添加 crossorigin="anonymous" 并且返回的 JS 文件响应头加上 Access-Control-Allow-Origin: * 即可捕捉到完整的错误堆栈。

3. 跨域与图片
前端项目在图片处理时可能会遇到图片绘制到 Canvas 上之后却不能读取像素或导出 base64 的问题。这个问题也是由同源策略引起。解决方式和上文相同，给图片添加 crossorigin="anonymous" 并在返回的图片文件响应头加上 Access-Control-Allow-Origin: * 即可解决。

参考内容：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/crossorigin
```
### 浏览器的重排重绘
###### 问题
```text
如何提升页面渲染性能
如何减少页面重排重绘
哪些行为会引起重排/重绘
```
###### 答案及解析
```text
渲染性能 Layout Paint

浏览器渲染大致分为四个阶段，其中在解析 HTML 后，会依次进入 Layout 和 Paint 阶段。样式或节点的更改，以及对布局信息的访问等，都有可能导致重排和重绘。而重排和重绘的过程在主线程中进行，这意味着不合理的重排重绘会导致渲染卡顿，用户交互滞后等性能问题。

解决方案
对 DOM 进行批量写入和读取（通过虚拟 DOM 或者 DocumentFragment 实现）。
避免对样式频繁操作，了解常用样式属性触发 Layout / Paint / Composite 的机制，合理使用样式。
合理利用特殊样式属性（如 transform: translateZ(0) 或者 will-change），将渲染层提升为合成层，开启 GPU 加速，提高页面性能。
使用变量对布局信息（如 clientTop）进行缓存，避免因频繁读取布局信息而触发重排和重绘。
另外，可以借助 DevTools Performance 面板来查看产生重排重绘任务占用主线程的情况和调用代码。


```
### 浏览器渲染机制
###### 问题
```text
浏览器如何渲染页面
有哪些提高浏览器渲染性能的方法
```
###### 答案及解析
```text
DOM CSSOM 线程互斥 渲染树 Compositing GPU 加速

当浏览器进程获取到 HTML 的第一个字节开始，会通知渲染进程开始解析 HTML，将 HTML 转换成 DOM 树，并进入渲染流程。一般所有的浏览器都会经过五大步骤，分别是：

PARSE：解析 HTML，构建 DOM 树。
STYLE：为每个节点计算最终的有效样式。
LAYOUT：为每个节点计算位置和大小等布局信息。
PAINT：绘制不同的盒子，为了避免不必要的重绘，将会分成多个层进行处理。
COMPOSITE & RENDER：将上述不同的层合成为一张位图，发送给 GPU，渲染到屏幕上。
为了提高浏览器的渲染性能，通常的手段是保证渲染流程不被阻塞，避免不必要的绘制计算和重排重绘，利用 GPU 硬件加速等技术来提高渲染性能。

优化影响渲染的资源
关键 CSS 资源放在头部加载。
JS 通常放在页面底部。
为 JS 添加 async 和 defer 属性。
body 中尽量不要出现 CSS 和 JS。
为 img 指定宽高，避免图像加载完成后触发重排。
避免使用 table, iframe 等慢元素。原因是 table 会等到它的 dom 树全部生成后再一次性插入页面中；iframe 内资源的下载过程会阻塞父页面静态资源的下载及 css, dom 树的解析。
```
### 如何定位内存泄露
###### 问题
```text
垃圾回收机制
```
###### 答案及解析
```text
垃圾回收 DevTools

内存泄漏是指不再使用的内存，没有被垃圾回收机制回收。当内存泄漏很大或足够频繁时，用户会有所感知：轻则影响应用性能，表现为迟缓卡顿；重则导致应用崩溃，表现为无法正常使用。为了避免内存泄漏带来的不良影响，需要对垃圾回收机制进行了解，掌握内存泄漏分析方法，完善线上相关监控措施。

内存泄漏定位和分析一般需要辅助工具，比如 Chrome DevTools。开发者可以通过 DevTools 记录页面活动概况，生成可视化分析结果，从时间轴中直观了解内存泄漏情况；利用 DevTools 获取若干次内存快照，检查内存堆栈变化；以及使用 Chrome 任务管理器，实时监控内存的使用情况。
```
### 垃圾回收机制
###### 问题
```text
什么是内存泄漏
常见的垃圾回收算法
如何排查内存泄漏
```
###### 答案及解析
```text
引用计数法 标记清除法 Mark-Compact（标记整理） Scavenger（清道夫）

GC（Garbage Collection，垃圾回收）是一种内存自动管理机制， 垃圾回收器（Garbage Collector）可以自动回收分配给程序的已经不再使用的内存。常见的 GC 算法有引用计数法和标记清除法等。V8（JavaScript 引擎，提供执行 JavaScript 的运行时环境）的垃圾回收器算法主要由 Mark-Compact 和 Scavenger 构成。

1. 内存泄漏
内存泄漏是指，应当被回收的对象没有被正常回收，变成常驻老生代的对象，导致内存占用越来越高。内存泄漏会导致应用程序速度变慢、高延时、崩溃等问题。

1.1 内存生命周期
分配：按需分配内存。
使用：读写已分配的内存。
释放：释放不再需要的内存。
1.2 内存泄漏常见原因
创建全局变量，且没有手动回收。
事件监听器 / 定时器 / 闭包等未正常清理。
使用 JavaScript 对象来做缓存，且不设置过期策略和对象大小控制。
队列拥塞所带来的消费不及时问题。
2. Reference Counting（引用计数）
Reference Counting 是常见的垃圾回收算法，其核心思路是：将资源（比如对象）的被引用次数保存起来，当被引用次数为零时释放。该方法的局限性：当出现循环引用时，互相引用的对象不会被回收。

3. V8 垃圾回收机制
V8 中有两个垃圾收集器。主要的 GC 使用 Mark-Compact 垃圾回收算法，从整个堆中收集垃圾。小型 GC 使用 Scavenger 垃圾回收算法，收集新生代垃圾。

两种不同的算法应对不同的场景：

使用 Scavenger 算法主要处理存活周期短的对象中的可访问对象。
使用 Mark-Compact 算法主要处理存活周期长的对象中的不可访问的对象。
因为新生代中存活的可访问对象占少数，老生代中的不可访问对象占少数，所以这两种回收算法配合使用十分高效。

3.1 分代垃圾收集
在 V8 中，所有的 JavaScript 对象都通过堆来分配。V8 将其管理的堆分成两代：新生代和老生代。其中新生代又可细分为两个子代（Nursery、Intermediate）。

即新生代中的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象。

image

3.2 Mark-Compact 算法（Major GC）
Mark-Compact 算法可以看作是 Mark-Sweep（标记清除）算法和 Cheney 复制算法的结合。该算法主要分为三个阶段：标记、清除、整理。

image

标记（Mark）

标记是找所有可访问对象的过程。GC 会从一组已知的对象指针（称为根集，包括执行堆栈和全局对象等）中，进行递归标记可访问对象。

清除（Sweep）

清除是将不可访问的对象留下的内存空间，添加到空闲链表（free list）的过程。未来为新对象分配内存时，可以从空闲链表中进行再分配。

整理（Compact）

整理是将可访问对象，往内存一端移动的过程。主要解决标记清除阶段后，内存空间出现较多内存碎片时，可能导致无法分配大对象，而提前触发垃圾回收的问题。

3.3 Scavenger 算法（Minor GC）
V8 对新生代内存空间采用了 Scavenger 算法，该算法使用了 semi-space（半空间） 的设计：将堆一分为二，始终只使用一半的空间：From-Space 为使用空间，To-Space 为空闲空间。

image

新生代在 From-Space 中分配对象；在垃圾回收阶段，检查并按需复制 From-Space 中的可访问对象到 To-Space 或老生代，并释放 From-Space 中的不可访问对象占用的内存空间；最后 From-Space 和 To-Space 角色互换。
```
### 浏览器事件循环
###### 问题
```text
什么是浏览器事件循环
浏览器为什么需要事件循环
Node.js 中的事件循环
```
###### 答案及解析
```text
任务队列 异步 非阻塞

浏览器需要事件循环来协调事件、用户操作、脚本执行、渲染、网络请求等。通过事件循环，浏览器可以利用任务队列来管理任务，让异步事件非阻塞地执行。每个客户端对应的事件循环是相对独立的。

浏览器事件循环是以浏览器为宿主环境实现的事件调度，操作顺序如下：

1. 什么是浏览器事件循环
Event Loop 可以理解为一个消息分发器，通过接收和分发不同类型的消息，让执行程序的事件调度更加合理。
执行同步代码。
执行一个宏任务（执行栈中没有就从任务队列中获取）。
执行过程中如果遇到微任务，就将它添加到微任务的任务队列中。
宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）。
当前宏任务执行完毕，开始检查渲染，然后渲染线程接管进行渲染。
渲染完毕后，JavaScript 线程继续接管，开始下一个循环。

2. 浏览器为什么需要事件循环
由于 JavaScript 是单线程的，且 JavaScript 主线程和渲染线程互斥，如果异步操作（如上图提到的 WebAPIs）阻塞 JavaScript 的执行，会造成浏览器假死。而事件循环为浏览器引入了任务队列（task queue），使得异步任务可以非阻塞地进行。

浏览器事件循环在处理异步任务时不会一直等待其返回结果，而是将这个事件挂起，继续执行栈中的其他任务。当异步事件返回结果，将它放到任务队列中，被放入任务队列不会立刻执行回调，而是等待当前执行栈中所有任务都执行完毕，主线程处于空闲状态，主线程会去查找任务队列中是否有任务，如果有，取出排在第一位的事件，并把这个事件对应的回调放到执行栈中，执行其中的同步代码。

3. 宏任务与微任务
异步任务被分为两类：宏任务（macrotask）与微任务（microtask），两者的执行优先级也有所区别。

宏任务主要包含：script（整体代码）、setTimeout、setInterval、setImmediate、I/O、UI 交互事件。

微任务主要包含：Promise、MutationObserver 等。

在当前执行栈为空的时候，主线程会查看微任务队列是否有事件存在。如果不存在，那么再去宏任务队列中取出一个事件并把对应的回调加入当前执行栈；如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈。如此反复，进入循环。下面通过一个具体的例子来进行分析：

Promise.resolve().then(() => {  
  // 微任务1  console.log("Promise1");  setTimeout(() => {    // 宏任务2    console.log("setTimeout2");  }, 0);});  
setTimeout(() => {  
  // 宏任务1  console.log("setTimeout1");  Promise.resolve().then(() => {    // 微任务2    console.log("Promise2");  });}, 0);  

最后输出顺序为：Promise1 => setTimeout1 => Promise2 => setTimeout2。具体流程如下：

同步任务执行完毕。微任务 1 进入微任务队列，宏任务 1 进入宏任务队列。
查看微任务队列，微任务 1 执行，打印 Promise1，生成宏任务 2，进入宏任务队列。
查看宏任务队列，宏任务 1 执行，打印 setTimeout1，生成微任务 2，进入微任务队列。
查看微任务队列，微任务 2 执行，打印 Promise2。
查看宏任务队列，宏任务 2 执行，打印 setTimeout2。

4. Node.js 中的事件循环
在 Node.js 中，事件循环表现出的状态与浏览器中大致相同。不同的是 Node.js 中有一套自己的模型。 Node.js 中事件循环的实现是依靠的 libuv 引擎。下图简要介绍了事件循环操作顺序：
timers：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
pending callbacks：执行延迟到下一个循环迭代的 I/O 回调。
idle、prepare：仅系统内部使用。
poll：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
check：setImmediate() 回调函数在这里执行。
close callbacks：一些关闭的回调函数，如：socket.on('close', ...)。
在每次运行的事件循环之间，Node.js 检查它是否在等待任何异步 I/O 或计时器，如果没有的话，则完全关闭。

需要注意的是，宏任务与微任务的执行顺序在 Node.js 的不同版本中表现也有所不同。同样通过一个具体的例子来分析：

setTimeout(() => {  
  console.log("timer1");  Promise.resolve().then(function () {    console.log("promise1");  });}, 0);  
  
setTimeout(() => {  
  console.log("timer2");  Promise.resolve().then(function () {    console.log("promise2");  });}, 0);  

在 Node.js v11 及以上版本中一旦执行一个阶段里的一个宏任务（setTimeout，setInterval 和 setImmediate），会立刻执行微任务队列，所以输出顺序为timer1 => promise1 => timer2 => promise2。
在 Node.js v10 及以下版本，要看第一个定时器执行完成时，第二个定时器是否在完成队列中。
如果第二个定时器还未在完成队列中，输出顺序为timer1 => promise1 => timer2 => promise2。
如果是第二个定时器已经在完成队列中，输出顺序为timer1 => timer2 => promise1 => promise2。

```
### Babel 的原理
###### 问题
```text
Babel 是什么
Babel 有什么用
压缩代码如何实现
```
###### 答案及解析
```text
JS 编译器 AST 插件系统

Babel 是 JavaScript 编译器：他能让开发者在开发过程中，直接使用各类方言（如 TS、Flow、JSX）或新的语法特性，而不需要考虑运行环境，因为 Babel 可以做到按需转换为低版本支持的代码；Babel 内部原理是将 JS 代码转换为 AST，对 AST 应用各种插件进行处理，最终输出编译后的 JS 代码。
```
### 类别
###### 问题
```text

```
###### 答案及解析
```text

```
