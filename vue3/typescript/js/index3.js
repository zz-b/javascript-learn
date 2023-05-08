function func2() {
}
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.msg = this.name + this.age;
    }
    return Person;
}());
function showMsg(person) {
    return person.age + person.name + person.msg;
}
var p = new Person("张三", 19);
console.log(p);
console.log(showMsg(p));
