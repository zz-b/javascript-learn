import {initState} from './initState'
export function initMixin(Vue){
  Vue.prototype._init = function(options){
    console.log('init');
    console.log(options);
    let vm = this;
    vm.$options = options;
    initState(vm);
  }
}