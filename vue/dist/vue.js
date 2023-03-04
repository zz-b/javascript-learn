(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

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
    data = typeof data === "function" ? data.call(vm) : data;
    console.log(data);
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
