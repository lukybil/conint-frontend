const { createProxyMiddleware } = require('http-proxy-middleware');
const host = process.env.BACKEND_HOST || 'localhost';
const port = process.env.BACKEND_PORT || 10001;

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${host}:${port}`,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/',
      },
    })
  );
};
