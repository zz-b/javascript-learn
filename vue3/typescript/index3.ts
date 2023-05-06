function func2(){

}
class Person{
  name: string
  age: number
  constructor(name, age){
    this.name = name;
    this.age = age;
  }
}
const p = new Person("张三", 19)
console.log(p)