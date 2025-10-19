# TS 变量声明

```typescript
// 1 语法格式
// declare var|let|const 变量名: 类型;
// declare function 函数名(参数): 返回值类型;
// declare class 类名 { ... }
// declare namespace 命名空间名 { ... }
// declare module 模块名 { ... }
// declare global { ... }
// declare enum 枚举名 { ... }

// 2.1 声明变量
// 声明全局变量
declare var $: (selector: string) => any;
declare let APP_VERSION: string;
declare const MAX_SIZE: number;
// 使用
$('#myElement').hide();
console.log(APP_VERSION);

// 2.2 声明函数
// 声明全局函数
declare function greet(name: string): void;
declare function calculate(a: number, b: number): number;
// 重载函数声明
declare function createElement(tag: 'div'): HTMLDivElement;
declare function createElement(tag: 'span'): HTMLSpanElement;
declare function createElement(tag: string): HTMLElement;

// 2.3 声明类
declare class Animal {
    name: string;
    constructor(name: string);
    speak(): void;
}

declare class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string);
    bark(): void;
}

// 2.4 声明枚举
declare enum Direction {
    Up,
    Down,
    Left,
    Right
}

declare const enum HttpStatus {
    OK = 200,
    NotFound = 404,
    ServerError = 500
}

// 2.5 声明命名空间
declare namespace MyLibrary {
    interface Config {
        apiUrl: string;
        timeout: number;
    }

    function init(config: Config): void;
    class Utilities {
        static formatDate(date: Date): string;
    }

    namespace Internal {
        function validate(input: string): boolean;
    }
}
// 使用
// MyLibrary.init({ apiUrl: 'https://api.example.com', timeout: 5000 });

// 2.6 声明模块
// 为第三方模块提供类型
declare module 'jquery' {
    function $(selector: string): any;
    namespace $ {
        function ajax(url: string): Promise<any>;
    }
    export = $;
}
// 声明非 JS 模块
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}
```

```typescript
// const 直接数据类型不可更改，但Object可以
const com: boolean = false;
let name: boolean = false;
```

## 数据类型

```text
boolean false true
number 0-9 0xf00d 0b1010 二进制和八进制
string "" ``
Array type[](type number, string) Array<type>(type number, string)
[type1, type2] Tuple
enum Es {At1 = 0, At2}
any
void
undefined
null
object
never
```

# 数据使用

```typescript
// 在数据与视图之间变更操作的时候尽可能使用此项
interface Itf {
	id: any;
	color?: string;
	width?: number;
	isShow?: boolean;
	readonly?: object;
}
// 关于class，在使用hooks中本人不习惯使用
class cA {}
class cB extends cA {}
// FN 与泛型结合
function Fn(x: string, y: number) {}
function Fn(x: string, y: number): string {
	return "";
}
function Fn<T>(args: T): T {
	return args;
}
function Fn<T extends cA>(args: T): T {
	return args;
}
// 关于枚举
enum eA {
	x,
	y,
}
enum eB {
	x = 0,
	y = "a",
}
eB[x];

declare function greet(greeting: string): void;
declare type Ta<T = any> = Tb<string, T>;
```

# 装饰器

```typescript
function color(value: string) {
	// 这是一个装饰器工厂
	return function (target) {
		//  这是装饰器
		// do something with "target" and "value"...
	};
}

function enumerable(value: boolean) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		descriptor.enumerable = value;
	};
}
class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}

	@enumerable(false)
	greet() {
		return "Hello, " + this.greeting;
	}
}
```
