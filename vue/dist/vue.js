(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

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
    console.log("defineReactive", data, key, value);
    observer(value);//递归劫持
    Object.defineProperty(data, key, {
      get(){
        console.log("get");
        return value
      },
      set(newValue){
        observer(value);//处理设置对象问题例如把o={a:1,b:{c:1}}通过o.b={d:1}，变成了o={a:1,b:{d:1}}
        console.log("set");
        if(newValue===value) return;
        value = newValue;
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
