// route: error 
exports.route = function () {
    routes.error('404', function (req, res) {

        this.views('error', {
        	code : 404
        });
        
    });

    routes.error('500', function (req, res) {

        this.views('error', {
        	code : 500
        });
        
    });
}