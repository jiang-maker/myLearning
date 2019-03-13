
// 正则表达式
//字面量法
let reg1:RegExp = /jspang/gi     // 'g' 全局匹配，'i'忽略大小写
let website:string = 'www.jSpang.com'
let res:boolean = reg1.test(website)

console.log(res)

// 构造函数法

let reg2:RegExp = new RegExp("jspang","gi")


// 常用的匹配方法 test() 和 exec()
let res1:boolean = reg1.test(website)   // 匹配成功输出true，反之false

let res2 = reg1.exec(website)   //成功输出数组，反之null，  成功结果：[ 'jSpang', index: 4, input: 'www.jSpang.com' ]

console.log(res1);
console.log(res2);