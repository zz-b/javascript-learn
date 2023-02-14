class Star{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    sing(){
        console.log(this.name + "在唱歌。。。");
    }
}
const p1 = new Star("lyf", 19);
const p2 = new Star("shl", 20);
p1.sing();
p2.sing();
console.log(p1.sing === p2.sing)//true,两个对象公用一个sing方法

