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
// 匹配 {{ }} 表达式
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

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
  console.log("开始标签：",tagName)
  let element = createASTElement(tagName, attrs)
  if(!root) {
    root = element
  }
  createParent = element
  stack.push(element)
}
function charts(text){
  console.log("文本：",text)
  text = text.replace(/\s/g,"")
  if(text){
    createParent.children.push({
      type:3,
      text
    })
  }
}
function end(tag){
  let element = stack.pop()
  createParent = stack[stack.length-1]
  if(createParent){
    element.parent = createParent.tag
    createParent.children.push(element)
  }
}
function parseHTML(html){
  while(html){
    let textEnd = html.indexOf("<")
    if(textEnd === 0){
      // 开始标签
      const startTagMatch = parseStartTag()
      if(startTagMatch){
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      // 结束标签
      let endTagMatch = html.match(endTag)
      if(endTagMatch){
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        continue
      }
      // continue
    } 
    let text
    if(textEnd > 0){
      console.log(textEnd,html)
      text = html.substring(0,textEnd)
     
    }
    if(text){
      advance(text.length)
      charts(text)
      continue
    }

    // break;
  }
  function parseStartTag(){
    const start = html.match(startTagOpen)
    if(!start) return
    console.log(start)
    let match = {
      tagName:start[1],
      attrs:[]
    }
    advance(start[0].length)
    // 属性匹配
    let attr
    let end
    while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
      // console.log(attr)
      match.attrs.push({name:attr[1],value:attr[3]||attr[4]||attr[5]})
      advance(attr[0].length)
    }
    if(end){
      console.log("end:",end)
      advance(end[0].length)
      return match
    }

  }
  function advance(n){
    html = html.substring(n)
    console.log("修改后的html:" + "\n" + html)
  }
  console.log(root)
  return root;
}
export function compileToFunction(template){
  let ast = parseHTML(template)
}