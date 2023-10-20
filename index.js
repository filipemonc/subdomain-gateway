const http = require("http");
const httpProxy = require("http-proxy");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const proxy = httpProxy.createProxyServer();
http.createServer((req, res) => {
    var target,
        host = req.headers.host;
    switch (host) {
        case `auth.${process.env.MAIN_DOMAIN}`:
            target = { host: "localhost", port: "5002" };
            break;
        case `email.${process.env.MAIN_DOMAIN}`:
            target = { host: "localhost", port: "5003" };
            break;
        default:
            return res.end("localhost");
    }
    proxy.web(req, res, {
        target: target,
        secure: false,
    });
}).listen(PORT, () => console.log(`Server running on port ${PORT}`));
