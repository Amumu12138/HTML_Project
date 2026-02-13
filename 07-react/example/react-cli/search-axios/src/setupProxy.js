const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', {
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: { '^/api1': '' }
        }),
        createProxyMiddleware('/api2', {
            target: 'http://localhost:7070',
            changeOrigin: true,
            pathRewrite: { '^/api2': '' }
        }),

    )
}