function Star(name, age) {
    this.name = name;
    this.age = age;
}
Star.prototype.sing = function () {
    console.log(this.name + "在唱歌。。。");
}
const p1 = new Star("lyf", 19);
const p2 = new Star("shl", 20);
p1.sing();
p2.sing();
// prototype原型对象，__proto__对象原型（叫法不一样，实际上指向同一个内存区域）
console.log(p1.sing === p2.sing)//true,两个对象公用一个sing方法
console.log(p1.__proto__ === p2.__proto__)
console.log(p1.__proto__ === Star.prototype)
console.dir(p1)
