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
const p = new Person("张三", 19)
console.log(p)
console.log(showMsg(p));