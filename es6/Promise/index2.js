const PENDING = 'pending';
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
// 实现promise的then方法
class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];
  constructor(exector){
    const resolve = (data) =>{
      this.#changeState(FULFILLED, data);
    }
    const reject = (reason) =>{
      this.#changeState(REJECTED, reason);
    }
    try {
      exector(resolve, reject);
    } catch (error) {
      reject(error);
    }
 
  }
  then(onFulfilled, onRejected){
    return new MyPromise((resolve, reject)=>{
      this.#handlers.push({
        onFulfilled, onRejected
      })
      this.#run();
    })
  }
  #changeState(state, result){
    if(this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }
  #run(){
    if(this.#state === PENDING) return;//这行代码很重要
    // console.log(this.#handlers.length)
    while (this.#handlers.length) {
      const {onFulfilled, onRejected} = this.#handlers.shift();
      if(typeof onFulfilled === "function" && this.#state === FULFILLED){
        onFulfilled(this.#result);
      }else if(typeof onRejected === "function" && this.#state === REJECTED){
        onRejected(this.#result);
      }
    }
  }
}
const p = new MyPromise((resove,reject)=>{
  setTimeout(()=>{
    resove("succcess!!");
    // reject("reject!!");
  },1000)
  // resove("succcess!!");
})
p.then((resove)=>{
  console.log(1)
  console.log(resove)
}, (error)=>{
  console.log(4)
  console.log(error)
})
p.then((resove)=>{
  console.log(2)
  console.log(resove)
}, (error)=>{
  console.log(5)
  console.log(error)
})
p.then((resove)=>{
  console.log(3)
  console.log(resove)
}, (error)=>{
  console.log(6)
  console.log(error)
})