var net = require('net');

/// 获取可用端口
var port = 3000;

(function getPort(port) {
    var server = net.createServer();

    server.listen(port, function () {
        server.once('close', function () {
            require('./lib/app.js')(port);
        });
        server.close();
    });
    
    server.on('error', function () {
        console.log('启动失败，'+ port +'端口被占用');
    });
})(port);