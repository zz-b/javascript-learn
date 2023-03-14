import {initState} from './initState'
import { compileToFunction } from './compile/index';
export function initMixin(Vue){
  Vue.prototype._init = function(options){
    console.log('init');
    console.log(options);
    let vm = this;
    vm.$options = options;
    initState(vm);
  }

  Vue.prototype.$mount = function(el){
    let vm = this;
    let options = vm.$options;
    console.log("el",el)
    el = document.querySelector(el || options.el);
    if(!options.render){
      let template = options.template;
      if(!template){
        el = el.outerHTML;
        console.log(el)
        // 把html构建抽象语法树ast
        let ast = compileToFunction(el);
      }
    }
  }
}