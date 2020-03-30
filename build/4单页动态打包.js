//动态打包
//安装依赖文件 npm install glob
var webpack=require("webpack")
var path=require("path")
//声明plugin
var htmlWebpackPlugin=require("html-webpack-plugin")
//声明glob
var glob=require("glob")
var dist_path=path.resolve(__dirname,"../dist")//声明路径
var src_path=path.resolve(__dirname,"../src")

var entryFile={};
//var files1=path.join(src_path,"/**/*.js")
//console.log(files1)
var files=glob.sync(src_path+"/**/*.js")//通过正则判断
//console.log(files)
files.forEach(function(file,index){
	var subkey=file.match(/src\/(\S*)\.js/)[1];
	entryFile[subkey]=file;
})
//console.log(entryFile)
module.exports={
	//入口js文件
	entry:entryFile,
	//编译输出的js文件路径
	output:{
		//合并成一个文件
		path:dist_path,//路径
		filename:'[name].[chunkhash:5].js'//通过hash改变名称，只会打包改动的js，cdm缓存,可控制位数
	},
	//模块解析
	module:{},
	//插件
	//安装依赖 npm install html-webpack-plugin --dev
	plugins:[
		new htmlWebpackPlugin({
			filename:dist_path+"/index.html",
			title:"测试",
			template:path.resolve(__dirname,"../index.html"),
			inject:true,//body head true false (script放在哪里，默认true)
			hash:true,
			//minfy:true,//是否压缩
		})
	],
	
	//开发服务器,需要安装命令 npm install webpack-dev-server
	//package.json配置dev命令
	//通过配置可通过http://localhost:8011/查看
	devServer:{
		hot:true,//热更新
		contentBase:dist_path,//热启动生成的文件
		port:8011,//服务端口
		host:"0.0.0.0",//host地址
		historyApiFallback:true,
		open:true,
		useLocalIp:true,//是否在打包的时候用自己的ip
		proxy:{
			'/api':'http://localhost:8080'
		},

	}
}