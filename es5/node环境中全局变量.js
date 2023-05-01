// 在nodejs环境中运行此代码
console.log(typeof window === "undefined")
console.log(typeof window == undefined)
console.log(globalThis)
console.log(global === globalThis)
console.log(this === globalThis)
// 判断当前环境是浏览器环境还是node环境
if(typeof window !== 'undefined'){
  console.log("browser")
}else{
  console.log("nodejs")
}