// vue配置文件
const path = require('path')

module.exports = {
    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        // 自动导入less文件
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type),
            path.resolve(__dirname, './src/assets/style/less/*.less'),
        ))
        // 自动导入scss文件
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type),
            path.resolve(__dirname, './src/assets/style/scss/*.scss'),
        ))
    },
}

function addStyleResource(rule, patterns) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: patterns,
        })
}