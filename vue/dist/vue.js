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
      // console.log("执行了" + method + "方法。。。");//方法劫持
      let result = oldArray[method].apply(this, args);//注意this指向调用这些方法的数组
      let inserted;//专门用来处理数组插入新的数据不能被监听到的情况
      switch (method){
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          inserted = args.slice(2);//对于splice方法进行添加数据时，第三个参数才是要插入的数据，所以用args.slice(2)
          break;
      }
      let ob = this.__ob__;//这个__ob__属性是在Observer类的构造函数中添加的，属性值就是Observer类的实例
      if(inserted){
        // 如果有插入的数据（指的是对象类型的数据，基本类型的数组数据vue直接放弃监听，对于数据，vue只监听对象类型数据）
        ob.observeArray(inserted);//把新添加的数据再次利用Observer类的实例的方法observeArray进行监听
      }
      return result
    };
  });

  function observer(data){
    // console.log("observer", data)
    if(typeof data!=="object" || data===null){
      return data;
    }
    //1对象2数组，这个Observer既监听对象，又监听数组，通过Observer实例的walk方法监听对象，通过observeArray监听数组
    return new Observer(data);
   
  }

  class Observer{
    constructor(value){
      // 数组或者对象都添加一个__ob__属性，为了后面利用这个Observer的实例方法，让data中的每一个对象都添加一个__ob__属性
      Object.defineProperty(value, "__ob__", {
        value: this,
        enumerable: false
      });
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
        // console.log("执行了get方法，获取的属性为" + key + "获取的属性值为" + value)
        return value
      },
      set(newValue){
        if(newValue === value) return;
        value = newValue;
        // console.log("执行了set方法，设置的属性为" + key + "设置的属性值为" + value)
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
    // 用proxy函数将data中属性代理代理到vm本身上面
    const object = data;
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        proxy(vm, "_data", key);
      }
    }
    // 对data进行劫持
    observer(data);//data分为对象和数组两种情况
  }
  function proxy(vm, source, key){
    Object.defineProperty(vm, key, {
      get:function(){
        console.log("vm-proxy-get");
        return vm[source][key];
      },
      set:function(value){
        if(value !== vm[source][key]) vm[source][key] = value;
        console.log("vm-proxy-set");
      }
    });
  }

  /**
   * html:
   * <div id="app">
      <h1>hello {{msg}}</h1>
    </div>
   * 
    ast{} VNode{}
    {
      tag:"div",
      attrs:[{id:"app"}],
      children:[
        {tag:null,},
        {tag:"h1",attrs:[],children:[]}
      ]
    }
   * 
   * 
   * */

  // 标签名 a-aaa
  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  
  // 命名空间标签 aa:aa-xxx
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
  // 开始标签-捕获标签名
  const startTagOpen = new RegExp(`^<${qnameCapture}`); 
  // 结束标签-匹配标签结尾的 </div>
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
  // 匹配属性
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; 
  // 匹配标签结束的 >
  const startTagClose = /^\s*(\/?)>/;

  let root;//根元素
  let createParent;//当前元素的父元素
  // 数据结构栈
  let stack = [];


  // 创建ast语法树
  function createASTElement(tag, attrs){
    return {
      tag,
      attrs,
      children:[],
      type:1,
      parent:null
    }
  }

  function start(tagName, attrs){
    console.log("开始标签：",tagName);
    let element = createASTElement(tagName, attrs);
    if(!root) {
      root = element;
    }
    createParent = element;
    stack.push(element);
  }
  function charts(text){
    console.log("文本：",text);
    text = text.replace(/\s/g,"");
    if(text){
      createParent.children.push({
        type:3,
        text
      });
    }
  }
  function end(tag){
    let element = stack.pop();
    createParent = stack[stack.length-1];
    if(createParent){
      element.parent = createParent.tag;
      createParent.children.push(element);
    }
  }
  function parseHTML(html){
    while(html){
      let textEnd = html.indexOf("<");
      if(textEnd === 0){
        // 开始标签
        const startTagMatch = parseStartTag();
        if(startTagMatch){
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue
        }
        // 结束标签
        let endTagMatch = html.match(endTag);
        if(endTagMatch){
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue
        }
        // continue
      } 
      let text;
      if(textEnd > 0){
        console.log(textEnd,html);
        text = html.substring(0,textEnd);
       
      }
      if(text){
        advance(text.length);
        charts(text);
        continue
      }

      // break;
    }
    function parseStartTag(){
      const start = html.match(startTagOpen);
      if(!start) return
      console.log(start);
      let match = {
        tagName:start[1],
        attrs:[]
      };
      advance(start[0].length);
      // 属性匹配
      let attr;
      let end;
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
        // console.log(attr)
        match.attrs.push({name:attr[1],value:attr[3]||attr[4]||attr[5]});
        advance(attr[0].length);
      }
      if(end){
        console.log("end:",end);
        advance(end[0].length);
        return match
      }

    }
    function advance(n){
      html = html.substring(n);
      console.log("修改后的html:" + "\n" + html);
    }
    console.log(root);
    return root;
  }
  function compileToFunction(template){
    parseHTML(template);
  }

  function initMixin(Vue){
    Vue.prototype._init = function(options){
      console.log('init');
      console.log(options);
      let vm = this;
      vm.$options = options;
      initState(vm);
    };

    Vue.prototype.$mount = function(el){
      let vm = this;
      let options = vm.$options;
      console.log("el",el);
      el = document.querySelector(el || options.el);
      if(!options.render){
        let template = options.template;
        if(!template){
          el = el.outerHTML;
          console.log(el);
          // 把html构建抽象语法树ast
          compileToFunction(el);
        }
      }
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
