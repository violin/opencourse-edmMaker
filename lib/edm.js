var fs = require('fs');
var ejs = require('ejs');
var path = require('path');
var url = require('url');
var mkdirp = require('mkdirp');

/*
	edm json 格式
 	
 	data = {
 		name:'',
		title:'',
		description:'',
		keywords:'',
		imageurl:'',
		imagealt:'',
		width:500,
		height:500,
		backgroundcolor:'#fff',
		paddingtopbottom:0,
		links:[
			{
				title:'',
				x:0,
				y:0,
				width:100,
				height:100,
				url:''
			}
		],
		date:''
 	}
	 
 */

// edm 工具类
var Edm = function (argument) {
	this.cachePath = ROOT + 'cache/';

	// 创建文件夹
	try{
		mkdirp.sync(this.cachePath);
		console.log('创建cache文件夹成功');
	}catch(err){
		console.log('创建cache文件夹失败，' + err.message);
		process.exit(0);
	}
}

// 处理data
Edm.prototype.make = function (model) {
	// 处理links中的url和坐标
	for (var i = 0; i < model.links.length; i++) {
		var link = model.links[i];

		link.url = this.base64(link.url || '');
		link.x2 = (Number(link.x) || 0) + (Number(link.width) || 0);
		link.y2 = (Number(link.y) || 0) + (Number(link.height) || 0);
	};

	// 时间
	model.date = utils.formatTime(new Date().getTime());

	return model;
}

// 获取处理后(base64)字符串
Edm.prototype.base64 = function (url) {
	var bu = new Buffer(url);
	return bu.toString('base64');
}

// 保存edm文件到本地
Edm.prototype.save = function (data, callback) {
	var edmJsonContent = JSON.stringify(this.make(data));

	if (!edmJsonContent) {
		callback(false);
		return;
	};

	var fileName = data.name;
	var filepath = this.cachePath + fileName;

	if (!fileName || fileName == '') {
		callback(false);
		return;
	};

	// 删除文件
	if(fs.existsSync(filepath)){
		console.log('文件' + filepath + '已存在， 删除');
		fs.unlinkSync(filepath);
	}
                      
    fs.writeFile(filepath, edmJsonContent, {flag:'wx', encoding:'utf8'}, function(err){
        if (err) {
            if (err.code === 'EEXIST') {
                console.log('文件' + filepath + '已存在');
                callback(false);
            } else {
                console.log('保存文件' + filepath + '失败');
                callback(false);
            }
        } else {
            console.log('文件' + filepath + '保存成功');
            callback(fileName);
        }
    });
}

module.exports = function () {
    return new Edm();
}
