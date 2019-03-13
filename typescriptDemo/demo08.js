"use strict";
var jian = '江';
var yun = new String('yun');
console.log(jian.length);
console.log(yun.length);
var full = '生于斯，长于斯，终于斯';
var allone = '斯';
console.log(full.lastIndexOf(allone));
console.log(full.replace(/斯/g, '此'));
