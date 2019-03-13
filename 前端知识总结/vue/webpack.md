# Webpack入门指南

## 一、什么是 webpack？

[webpack](http://webpack.github.io/)是一款模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、ES6、样式（含less/sass）、图片等都作为模块来使用和处理。

[更多webpack学习内容](https://github.com/lengziyu/learn-webpack)


## 二、安装

```basic
$ npm install webpack -g
```

## 三. 配置

创建 **webpack.config.js** 它的作用和gulpfile.js一样就是一个配置项，设置 webpack 任务功能。

* entry 入口文件 让webpack用哪个文件作为项目的入口
* output 出口 让webpack把处理完成的文件放在哪里
* module 模块 要用什么不同的模块来处理各种类型的文件
* plugins 用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。
* resolve 用来设置路径指向
* watch 用监听文件有改动后执行打包

```javascript
module.exports = {
	entry:"",//入口文件
	output:{//出口
		path:"",
		filename:""
	},
	module:{//模块
		loaders:[
			{test:/\.js$/,loader:""}
		]
	},
	plugins:{},
	resolve:{},
	wacth:true
	
}
```

### webpack命令

```basic
//直接运行webpack.config.js来打包
$ webpack   

//压缩混淆脚本
$ webpack -p    
```
