let jian:string = '江'

let yun:String = new String('yun')

console.log(jian.length);
console.log(yun.length);

let full = '生于斯，长于斯，终于斯'
let allone = '斯'

console.log(full.lastIndexOf(allone))

console.log(full.replace(/斯/g,'此'));