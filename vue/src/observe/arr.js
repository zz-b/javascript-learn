let oldArray = Array.prototype
// 继承
export let newArray = Object.create(oldArray)
// 需要劫持的几个常用数组方法（只对methods中的几个数组方法进行劫持）
let methods = [
  "push",
  "pop",
  "unshift",
  "shift",
  "splice"
]
methods.forEach(method => {
  newArray[method] = function (...args) {
    console.log("执行了" + method + "方法。。。");//方法劫持
    let result = oldArray[method].apply(this, args);//注意this指向调用这些方法的数组
    let inserted;//专门用来处理数组插入新的数据不能被监听到的情况
    switch (method){
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);//对于splice方法进行添加数据时，第三个参数才是要插入的数据，所以用args.slice(2)
        break;
    }
    let ob = this.__ob__;//这个__ob__属性是在Observer类的构造函数中添加的，属性值就是Observer类的实例
    if(inserted){
      // 如果有插入的数据（指的是对象类型的数据，基本类型的数组数据vue直接放弃监听，对于数据，vue只监听对象类型数据）
      ob.observeArray(inserted);//把新添加的数据再次利用Observer类的实例的方法observeArray进行监听
    }
    return result
  };
});