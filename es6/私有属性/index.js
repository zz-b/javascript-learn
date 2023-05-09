class A {
  #a = 1;
  b = 2;
  constructor(params) {
      
  }
  get bb(){return this.b}
  get aa(){return this.#a}
  #f(){

      console.log(this)
  }
}
// 这里代码在浏览器环境都是可以运行的
const a = new A();
console.log(a)
console.log(a.bb)
console.log(a.aa)
console.log(a.#a)
// a.#ff()