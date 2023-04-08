var wrap = document.getElementById("wrap");
console.log(wrap)
function sleep(time){
  let now = Date.now();
  while(Date.now()-now<time){}
}
// sleep(2000)