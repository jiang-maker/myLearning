// 变量的作用域， 函数划分

var muyang = 'kobe'
function model():void{
  let muyang = 'dw'
  console.log(muyang + 'inside');
}
model();

console.log(muyang + 'outer');