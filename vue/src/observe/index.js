import {newArray} from './arr'
export function observer(data){
  console.log("observer", data)
  // 1对象
  if(typeof data!=="object" || data===null){
    return data;
  }
  return new Observer(data);
  // 2数组
}
class Observer{
  constructor(value){
    if(value instanceof Array){
      // 处理数组
      value.__proto__ = newArray
      this.observeArray(value)
    }else{
      this.walk(value);//遍历对象
    }
  }
  walk(data){
    let keys = Object.keys(data);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
  observeArray(data){
    for(let i = 0; i< data.length; i++){
      observer(data[i])
      /**
       * 数组中每一项进行观测，在observer方法中，会进行判断，只有对对象类型的才会进行监听（walk方法）
       * 而普通类型的数据不会走walk方法，自然就不会被监听
       * 例如var list = [1, "hello", {a:1}]；对于list这个数组，只有下标为2的这一项才会是被劫持，前两项不会被劫持（不具有相应式）
       * */ 
    }
  }
}
function defineReactive(data, key, value){
  // console.log("defineReactive", data, key, value)
  observer(value)//递归劫持
  Object.defineProperty(data, key, {
    get(){
      console.log("get", value)
      return value
    },
    set(newValue){
      console.log("set", newValue);
      if(newValue === value) return;
      value = newValue;
      observer(value);//处理设置对象问题例如把o={a:1,b:{c:1}}通过o.b={d:1}，变成了o={a:1,b:{d:1}}
    }
  })
}