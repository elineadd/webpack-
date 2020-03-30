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
var pluginAll=[]//放所有页面插件
var entryFile={};
//var files1=path.join(src_path,"/**/*.js")
//console.log(files1)
var files=glob.sync(src_path+"/**/*.js")//通过正则判断
//console.log(files)
//forEach循环
files.forEach(function(file,index){
	var subkey=file.match(/src\/(\S*)\.js/)[1];
	entryFile[subkey]=file;
})
//console.log(entryFile)
var pages=glob.sync(src_path+"/page/**/*.html")
console.log(pages)
pages.forEach(function(page,index){
	//C:/Users/Admin/Desktop/index/webpack-demo/src/page/index2.html
	var pagesre=page.match(/\/src\/page\/(\S*)\.html/);
	var name=pagesre[1]
	
	var plug=new htmlWebpackPlugin({
		filename:dist_path+"/"+name+".html",
		title:"测试"+name,
		template:src_path+"/page/"+name+".html",
		inject:true,//body head true false (script放在哪里，默认true)
		hash:true,
		chunks:[name],//用于多入口文件
		//minfy:true,//是否压缩
	})
	pluginAll.push(plug)
})

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
	module:{
		// 规则
		        rules: [
		            {
		                // 正则匹配所有以.css结尾的文件
		                test: /\.css$/,
		                // 使用css-loader和style-loader依次对css文件进行处理
		                // 按照数组中从后往前的顺序
		                use: [ 'style-loader', 'css-loader' ]
		            }
		        ]
		
	},
	//插件
	//安装依赖 npm install html-webpack-plugin --dev
	plugins:pluginAll,
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
		//useLocalIp:true,//是否在打包的时候用自己的ip
		proxy:{
			'/api':'http://localhost:8080'
		},

	}
}