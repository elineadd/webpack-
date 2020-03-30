//多个文件打包成一个
var webpack=require("webpack")
var path=require("path")

var dist_path=path.resolve(__dirname,"../dist")//声明路径
var src_path=path.resolve(__dirname,"../src")

module.exports={
	//入口js文件
	//采用数组
	entry:[src_path+'/index.js',src_path+'/test.js'],
	//编译输出的js文件路径
	output:{
		//合并成一个文件
		path:dist_path,//路径
		filename:'index.js'//名称
		
		
		
	},
	//模块解析
	module:{},
	//插件
	plugins:[],
	
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