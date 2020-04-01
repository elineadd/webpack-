const fs=require('fs')//fs文件系统
const result=fs.readFile('./05.js',(err,data)=>{
	if(err){
		console.log(err);
	}
	else
	{
		console.log(data.toString());
	}
	
})
console.log(result)