"use strict";
// 正则表达式
//字面量法
var reg1 = /jspang/gi;
var website = 'www.jSpang.com';
var res = reg1.test(website);
console.log(res);
// 构造函数法
var reg2 = new RegExp("jspang", "gi");
// 常用的匹配方法 test() 和 exec()
var res1 = reg1.test(website); // 匹配成功输出true，反之false
var res2 = reg1.exec(website); //成功输出数组，反之null
console.log(res1);
console.log(res2);
