class Demo {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  get Count() {
    return this.sum();
  }
  sum() {
    console.log(arguments);
    return this.a + this.b;
  }
}
export default Demo;
