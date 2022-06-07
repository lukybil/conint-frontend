const { createProxyMiddleware } = require('http-proxy-middleware');
const host = process.env.HOST || 'localhost';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${host}:10001`,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    })
  );
};