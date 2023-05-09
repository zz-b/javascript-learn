var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _MyPromise_instances, _MyPromise_state, _MyPromise_result, _MyPromise_changeState;
const PENDING = 'pending';
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
    constructor(exector) {
        _MyPromise_instances.add(this);
        _MyPromise_state.set(this, REJECTED);
        _MyPromise_result.set(this, undefined);
        const resove = (data) => {
            __classPrivateFieldGet(this, _MyPromise_instances, "m", _MyPromise_changeState).call(this, FULFILLED, data);
        };
        const reject = (reason) => {
            __classPrivateFieldGet(this, _MyPromise_instances, "m", _MyPromise_changeState).call(this, REJECTED, reason);
        };
        try {
            exector(resove, reject);
        }
        catch (error) {
            reject(error);
        }
    }
}
_MyPromise_state = new WeakMap(), _MyPromise_result = new WeakMap(), _MyPromise_instances = new WeakSet(), _MyPromise_changeState = function _MyPromise_changeState(state, result) {
    if (__classPrivateFieldGet(this, _MyPromise_state, "f") !== PENDING)
        return;
    __classPrivateFieldSet(this, _MyPromise_state, state, "f");
    __classPrivateFieldSet(this, _MyPromise_result, result, "f");
};
const p1 = new MyPromise((resove) => { resove(82); });
console.log(p1);
const p2 = new Promise((resove) => { resove(12); });
console.log(p2);
