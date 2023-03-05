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
    console.log("执行了" + method + "方法。。。")//方法劫持
    let result = oldArray[method].apply(this, args)
    return result
  }
})