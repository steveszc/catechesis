'use strict';

const proxyPath = '/api/esv';
const target = 'https://api.esv.org';
const pathRewrite = { '^/api/esv/': '/' };
const authorization = `Token ${process.env.ESV_TOKEN}`;

module.exports = function (app) {
  let proxy = require('http-proxy-middleware').createProxyMiddleware({
    changeOrigin: true,
    headers: { authorization },
    pathRewrite,
    secure: false,
    target,
  });

  app.use(proxyPath, proxy);
};
