var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

global.ROOT = path.join(__dirname, '../');
global.utils = require('./utils.js');
global.routes = require('./routes.js')();

var MIME_TYPES = require('./mime.js');

/// 读取routes
var routeFiles = fs.readdirSync(ROOT + 'routes');

routeFiles.forEach(function (element, index) {
    require(ROOT + 'routes/' + element).route();
});

module.exports = function (port) {
    global.PORT = port;

    http.createServer(handleRequest).listen(port, function () {
        console.log('edm maker启动成功，监听端口%s中', port);
    });
}

function handleRequest(req, res){
    res.setTimeout(10000, function () {
        routes['errors']['500'](req, res);
    });

    var filepath = realpath(url.parse(req.url).pathname);
    var extname = path.extname(filepath);

    // view访问
    if (extname === '') {
        var fn = routes[req.method.toLowerCase() + 's'][filepath];

        if (fn) {
            fn(req, res);
        } else {
            routes['errors']['404'](req, res);
        }
    } else { // 静态文件访问
        fs.readFile(filepath, function (err, body) {
            if (err) {
                routes['errors']['404'](req, res);
            } else {
                res.writeHead(200, {
                    'Content-Type': MIME_TYPES[extname],
                    'Content-Length': body.length, /// 统计的是Buffer的长度，而非String的长度
                    'Server': 'opencourse edm maker'
                });
                    
                res.write(body);
            }

            res.end();
        });
    }
}

// 针对静态文件返回真实地址
function realpath(pathname) {
    if (/^\/((js)|(css)|(fonts)|(html))\/.+/i.test(pathname)) {
        return ROOT + 'res' + pathname;
    } else {
        return pathname;
    }
}

