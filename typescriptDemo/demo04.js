"use strict";
// function searchGril(age: number):string{
//   return 'I got the gril at ' + age +' years old'
// }
// var age: number = 19;
// var result: string = searchGril(age)
// console.log(result);
// 有可选参数的函数
function searchGril(age, stature) {
    if (age === void 0) { age = 20; }
    var yy = '';
    yy = 'find the gril at ' + age + ' years old';
    if (stature != undefined) {
        yy = yy + ',stature is ' + stature;
    }
    return yy;
}
var result = searchGril();
console.log(result);
