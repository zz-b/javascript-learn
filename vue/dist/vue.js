(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  let oldArray = Array.prototype;
  // 继承
  let newArray = Object.create(oldArray);
  // 需要劫持的几个常用数组方法（只对methods中的几个数组方法进行劫持）
  let methods = [
    "push",
    "pop",
    "unshift",
    "shift",
    "splice"
  ];
  methods.forEach(method => {
    newArray[method] = function (...args) {
      console.log("执行了" + method + "方法。。。");//方法劫持
      let result = oldArray[method].apply(this, args);
      return result
    };
  });

  function observer(data){
    console.log("observer", data);
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
        value.__proto__ = newArray;
        this.observeArray(value);
      }else {
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
        observer(data[i]);
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
    observer(value);//递归劫持
    Object.defineProperty(data, key, {
      get(){
        console.log("get", value);
        return value
      },
      set(newValue){
        console.log("set", newValue);
        if(newValue === value) return;
        value = newValue;
        observer(value);//处理设置对象问题例如把o={a:1,b:{c:1}}通过o.b={d:1}，变成了o={a:1,b:{d:1}}
      }
    });
  }

  function initState(vm){
    let opts = vm.$options;
    console.log("initState",opts);
    if(opts.props);
    if(opts.methods);
    if(opts.data){
      initData(vm);
    }
    if(opts.computed);
    if(opts.watch);
  }
  // vue2对data初始化
  function initData(vm){
    console.log("data初始化");
    let data = vm.$options.data;
    data = vm._data = typeof data === "function" ? data.call(vm) : data;
    console.log(data);
    // 对data进行劫持
    observer(data);//data分为对象和数组两种情况
  }

  function initMixin(Vue){
    Vue.prototype._init = function(options){
      console.log('init');
      console.log(options);
      let vm = this;
      vm.$options = options;
      initState(vm);
    };
  }

  function Vue(options){
    // 初始化
    this._init(options);
  }
  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
