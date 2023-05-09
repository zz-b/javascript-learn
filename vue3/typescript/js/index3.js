function func2() {
}
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.msg = this.name + this.age;
    }
}
function showMsg(person) {
    return person.age + person.name + person.msg;
}
const person = new Person("张三", 19);
console.log(person);
console.log(showMsg(person));
