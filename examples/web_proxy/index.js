const  http = require('http');
const httpProxy = require('http-proxy');
/* This is ghetto proxy server to provide proxy between Huawei LTE rotuer that does not support Access-Control-Allow-Origin (or does not allow), and OPTIONS request
 * to allow use of huawei-lte-api-ts in browser 
 * This was tested with B310s-22 
 * This code is PoC and should not be used in any production ENV!
 * This server listens on 127.0.0.1:3000
 */

var proxy = httpProxy.createProxyServer({});

proxy.on('proxyRes', function(proxyRes, req, res) {
    if (req.method == 'OPTIONS') {
        proxyRes.headers.allow = 'GET, POST';
        proxyRes.headers.accept = '*/*';
        proxyRes.statusCode = 204;
        proxyRes.statusMessage = 'No Content';
    }

    if ('origin' in req.headers) {
        proxyRes.headers['Access-Control-Allow-Origin'] = req.headers['origin'];
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,DELETE,OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, __requestverificationtoken';
    }

    if ('set-cookie' in proxyRes.headers) {
        const cookies = [];
        proxyRes.headers['set-cookie'].forEach((cookieString) => {
            cookies.push(cookieString + 'SameSite=None;Secure;');
        })

        proxyRes.headers['set-cookie'] = cookies;
    }
});

http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://192.168.8.1', autoRewrite: true, changeOrigin: true });
}).listen(3000);