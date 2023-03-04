import { observer } from "./observe/index.js";
export function initState(vm){
  let opts = vm.$options;
  console.log("initState",opts)
  if(opts.props){
    initProps();
  }
  if(opts.methods){
    initMethods(vm);
  }
  if(opts.data){
    initData(vm);
  }
  if(opts.computed){
    initComputed(vm);
  }
  if(opts.watch){
    initWatch(vm);
  }
}
function initProps(vm){}
function initMethods(vm){}
// vue2对data初始化
function initData(vm){
  console.log("data初始化");
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  console.log(data)
  // 对data进行劫持
  observer(data);//data分为对象和数组两种情况
}
function initComputed(vm){}
function initWatch(vm){}