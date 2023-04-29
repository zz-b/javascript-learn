var ff = function (){
  console.log(this.value)
}
ff();
ff.bind({value: 888})();