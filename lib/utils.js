/// 工具类
var querystring = require('querystring');

exports.isString = function (a) {
    return Object.prototype.toString.call(a).indexOf('String') > -1;
}

exports.isObject = function (a) {
    return Object.prototype.toString.call(a).indexOf('Object') > -1;
}

/**
 * Extend object
 * @param {Object} target Target object.
 * @param {Object} source Source object.
 * @param {Boolean} rewrite Rewrite exists values (optional, default false).
 * @return {Object} Modified object.
 */
exports.extend = function (target, source, rewrite) {
    
    if (target === null || source === null)
        return target;
    
    if (typeof (target) !== 'object' || typeof (source) !== 'object')
        return target;
    
    var keys = Object.keys(source);
    var i = keys.length;
    
    while (i--) {
        
        var key = keys[i];
        
        if (rewrite || target[key] === undefined)
            target[key] = source[key];
    }
    
    return target;
};

exports.formatTime = function(_millisec){
    var _time = new Date();
    _time.setTime(_millisec || 0);

    return _time.getFullYear() + '-' + 
            ((((_time.getMonth() + 1) < 10) ? '0':'')+(_time.getMonth() + 1)) + '-' + 
            (((_time.getDate()<10) ? '0':'')+ _time.getDate());
}

