"use strict";
// 变量的作用域， 函数划分
var muyang = 'kobe';
function model() {
    var muyang = 'dw';
    console.log(muyang + 'inside');
}
model();
console.log(muyang + 'outer');
