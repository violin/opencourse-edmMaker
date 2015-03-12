var fs = require('fs');
var edm = require('../lib/edm.js')();

// route: edm 
exports.route = function () {

    // 查询
    routes.get('/edm/search', function (req, res) {
        var fileName = req.get.fn || '';

        console.log('查询文件名称：' + fileName);

        var dest = ROOT + 'res/cache/' + fileName;

        console.log('查询路径：' + dest);

        var self = this;

        fs.exists(dest, function (exists) {
            if (exists) {
                self.json({
                    result:1
                });
            }else{
                self.json({
                    result:0
                });
            }

        });

    });

    // 获取
    routes.get('/edm/get', function (req, res) {
        var fileName = req.get.fn || '';

        console.log('获取文件名称：' + fileName);

        var dest = ROOT + 'res/cache/' + fileName;

        console.log('获取路径：' + dest);

        var self = this;

        var jsonbody;

        try {
            jsonbody = fs.readFileSync(dest, { encoding: 'utf8' });
        } catch (error) {
            console.log(error.message + ', 未找到文件');
                
            self.json({
                result:0
            });
            return;
        }

        var model = JSON.parse(jsonbody);

        self.json({
            result:1,
            data:model
        });

    });

	// 创建并保存
	routes.post('/edm/save', function (req, res) {
        var model = req.post;
        var self = this;

        // 处理links
        model.links = [];

        if (model.linkstr) {
            model.links = JSON.parse(model.linkstr)['links'];
            delete model.linkstr;
        };
        
        var value = edm.save(model, function(value){
            if (!!value) { // 成功
                self.json({
                    result:1,
                    name:value
                });
            }else{ // 失败
                self.json({
                    result:0
                });
            }
        });

    });

	// 下载功能
    routes.get('/edm/download', function (req, res) {
    	var fileName = req.get.fn || '';

    	console.log('下载文件名称：' + fileName);

        var dest = ROOT + 'res/cache/' + fileName;

        console.log('下载路径：' + dest);

        var jsonbody;

        try {
            jsonbody = fs.readFileSync(dest, { encoding: 'utf8' });
        } catch (error) {
            console.log(error.message + ', 未找到文件');
                
            routes['errors']['404'](req, res);
            return;
        }

        var model = JSON.parse(jsonbody);

        this.views('edm', model);
    });
}