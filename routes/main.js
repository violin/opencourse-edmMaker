// route: index 
exports.route = function () {
    routes.get('/', function (req, res) {

        this.views('index', {
        	
        });
        
    });

    routes.get('/edmEdit', function (req, res) {
    	// 如果有数据则填入
        var fileName = req.get.fn || '';

        this.views('edmEdit', {
        	fn : fileName
        });
        
    });

}