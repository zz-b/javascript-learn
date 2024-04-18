console.log(1)
new Promise((resolve, reject) => {
  console.log(2);
  setTimeout(()=>{
    console.log('fff')
  },100)
  setTimeout(()=>{
    console.log(3)
    resolve()
    console.log('aaa')
  }, 100)
}).then(function(){
  console.log(6)
}).then(function(){
  console.log('bbb')
}).then(function(){
  return new Promise((resolve,reject)=>{
    console.log('ddd')
    setTimeout(()=>{
      resolve()
    },90)
  })
}).then(()=>{console.log('ccc')})
setTimeout(()=>{console.log(4)}, 100)
console.log(5);
Promise.resolve().then(()=>{
  console.log(7)
})
console.log(8)
/**
 * 1
 * 2
 * 5
 * 8
 * 7
 * fff
 * 3
 * aaa
 * 6
 * bbb
 * ddd
 * 4
 * ccc
*/
/**
 * 异步队列（微队列）
 * []---> [function(){console.log(6)}]---> [function(){console.log(6)}, ()=>console.log(7)]
 * then方法是立刻执行的，导致then方法的回调是会先放到异步队列里面的。但setTimeout的回调是设置的时间到了后，才放到异步队列里的
 * */ 