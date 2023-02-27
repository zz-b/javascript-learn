var http = require('http');
var url = require("url");
http.createServer(function (request, response) {
  let queryParse = url.parse(request.url, true);
  console.log(queryParse)
  const {pathname, parse, query} = queryParse;
  // 设置cors一些列响应头来解决前端浏览器跨域问题
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Credentials': true,//允许后端发送cookie
    'Access-Control-Allow-Origin': request.headers.origin || "*",//任意域名都可以访问,或者基于我请求头里面的域
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',//设置请求头格式和类型
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
    'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
  });
  if(pathname === '/test'){
    const res = generatePrimes(query.quota);
    console.log("计算完成！")
    return response.end(JSON.stringify(res));
  }

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World');

}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
function generatePrimes(quota) {
  function isPrime(n) {
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
          return false;
       }
    }
    return true;
  }
  const primes = [];
  const maximum = 1000000;
  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}