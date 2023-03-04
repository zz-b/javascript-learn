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
    this.walk(value);//遍历
  }
  walk(data){
    let keys = Object.keys(data);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
      let value = data[key];
      defineReactive(data, key, value);
    }
  }
}
function defineReactive(data, key, value){
  console.log("defineReactive", data, key, value)
  observer(value)//递归劫持
  Object.defineProperty(data, key, {
    get(){
      console.log("get")
      return value
    },
    set(newValue){
      observer(value);//处理设置对象问题例如把o={a:1,b:{c:1}}通过o.b={d:1}，变成了o={a:1,b:{d:1}}
      console.log("set");
      if(newValue===value) return;
      value = newValue;
    }
  })
}