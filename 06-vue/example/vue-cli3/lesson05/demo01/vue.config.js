// vue配置文件
module.exports = {
    // 页面配置
    pages: {
        index: {
            entry: 'src/components/home/index.js',
            template: 'pulic/index.html'
        },
        products: {
            entry: 'src/components/products/index.js',
            template: 'pulic/index.html'
        }
    },
    chainWebpack: config => {
        // 移除preload 插件
        console.log('Amumu before -->', config.plugins)
        config.plugins.delete('preload');
        console.log('Amumu after -->', config.plugins)

        // 调整文件大小
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))
    }
}