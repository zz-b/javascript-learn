function func2(){

}
class Person{
  name: string
  age: number
  msg: string
  constructor(name, age){
    this.name = name;
    this.age = age;
    this.msg = this.name + this.age
  }
}
interface Iperson{
  name:string,
  age:number,
  msg:string
}
function showMsg(person:Iperson) : string{
  return person.age + person.name + person.msg;
}
const person = new Person("张三", 19)
console.log(person)
console.log(showMsg(person));