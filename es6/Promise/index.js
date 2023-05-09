const PENDING = 'pending';
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = REJECTED;
  #result = undefined;
  constructor(exector){
    const resove = (data) =>{
      this.#changeState(FULFILLED, data);
    }
    const reject = (reason) =>{
      this.#changeState(REJECTED, reason);
    }
    try {
      exector(resove, reject);
    } catch (error) {
      reject(error);
    }
 
  }
  #changeState(state, result){
    if(this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
  }
}
const p = new MyPromise((resove)=>{resove(82)})
console.log(p)
const p2 = new Promise((resove)=>{resove(12)})
console.log(p2)