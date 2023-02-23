const http = require('http');
const fs = require("fs");
const url = require('url');//url模块专门用来解析request.url（处理请求路径）
http.createServer(function (request, response) {
  let parsedUrl = url.parse(request.url, true)
  console.log(parsedUrl)
  const {search, query, pathname} = parsedUrl
  if(pathname === "/favicon.ico"){
    fs.readFile("./favicon.ico",(err, dataStr)=>{
      console.log(dataStr)//buffer
      response.writeHead(200, {'Content-Type': 'image/x-icon'});
      return response.end(dataStr);
    })
  }else if(pathname === "/jsonp"){
    if(query.cb === "myJsonpHander"){
      const obj = {
        name:'tom',
        age:19,
        scores:[
          {math:100, english:90, java:80, time:1}, 
          {math:89, english:86, java:80, time:2},
          {math:96, english:40, java:90, time:3},]
      }
      // 构建返回前端的js代码（就是一段普通js字符串）
      const cbStr =  `
      try{
        myJsonpHander(${JSON.stringify(obj)});
      }catch(e){}
      `
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(cbStr);
    }
  }else{
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World');
  }

}).listen(8088);

console.log('Server running at http://127.0.0.1:8088/');