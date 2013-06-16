var noop = function() {};

var https = require('https');

var defaults = {
    encodingIn: 'base64',
    encodingOut: 'utf8',
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/',
    headers: {
        'User-Agent': 'node.js'
    }
};

/**
 * get the contents of file from a github repo (limited to 60 requests per hour)
 * @param {String} repo the path to the repo in the form of user/repo
 * @param {String} filepath the filepath to get the contents of
 * @param {Object} [options] an options hash
 * @param {Function} cb the callback to call with the contents
 * @example
 * contents('fshost/xrpc', 'lib/xmlrpc-router.js', function (err, contents) {
 *     console.log(contents);
 * })
 */
module.exports = function(repo, filepath, options, cb) {
    if (typeof options === 'function') {
        cb = options;
        options = {};
    }
    var encoding = 'utf8';
    var defOpts = extend({}, defaults);
    defOpts.path += repo + '/contents/' + filepath;
    var settings = extend(options, defOpts);
    var encodingIn = settings.encodingIn;
    var encodingOut = settings.encodingOut;
    delete settings.encodingIn;
    delete settings.encodingOut;
    if (settings.encoding) {
        encodingOut = settings.encoding;
        delete settings.encoding;
    }
    var req = https.request(settings, function(res) {
        res.on('data', function(d) {
            var o = JSON.parse(d);
            if (o.content) {
                var b = new Buffer(o.content, encodingIn);
                cb(null, b.toString(encodingOut));
                cb = noop;
            }
            else {
                cb(new Error('unable to get contents of https://github.com/' + repo + '/' + filepath + '. Response data: ' + d));
                cb = noop;
            }
        });

    });
    req.on('error', function(err) {
        cb(err);
        cb = noop;
    });
    req.end();
};

/**
 * merge two objects
 * @param target object to merge
 * @param source object to merge
 * @param {Boolean} [modify] whether to modify the target
 * @returns {Object} object (new unless modify is true) consisting of the merged objects
 * @api private
 */

function extend(target, source, modify) {
    var result = target ? modify ? target : extend({}, target, true) : {};
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            result[key] = source[key];
        }
    }
    return result;
}