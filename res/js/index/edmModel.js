/**
 * edm model
 */

var EDM_DEFAULT_VALUE = {
	"name":"",
	"title":"",
	"description":"",
	"keywords":"",
	"imageurl":"",
	"imagealt":"",
	"width":0,
	"height":0,
	"backgroundcolor":"",
	"paddingtopbottom":0,
	"links":[
			
	],
	"date":""
}

var NEW_ITEM_DEFAULT = {
	"name":"",
	"title":"公开课",
	"description":"",
	"keywords":"",
	"imageurl":"",
	"imagealt":"",
	"width":500,
	"height":500,
	"backgroundcolor":"#fff",
	"paddingtopbottom":40,
	"links":[
			
	],
	"date":""
}

var Edm = Backbone.Model.extend({
	default : EDM_DEFAULT_VALUE,

	initialize : function (argument) {
		console.log('edm object inited');

	},

	save : function(callback){
		// 处理数组
		var data = this.attributes;	

		// 校验
		if (data.name == '') {
			alert('需要名称');
			return;
		};


		var arrtemp = [];

		// 去掉undefined项
		for (var i = 0; i < data.links.length; i++) {
			if(data.links[i] != undefined){
				arrtemp.push(data.links[i]); 
			}
		};

		data.linkstr = JSON.stringify({"links":arrtemp});

		$.post('/edm/save', data, function(data, textStatus, xhr) {
			if (data && data.result == 1) {
				if (callback) {
					callback(data);
				};
			}else{
				alert('保存失败');
			}
		});
	}
});

var edm = new Edm();