# TS 变量声明

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
