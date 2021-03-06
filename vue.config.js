module.exports = {
    lintOnSave: false,
    publicPath: './',
    outputDir: "dist", // 输出文件目录
    assetsDir: 'static', // 配置js、css静态资源二级目录的位置
    devServer: {
        host: '0.0.0.0',
        // host:'localhost',
        port: 8080,
        proxy: {
            '/api': {
                //target: 'http://8.134.12.113:8080',//黄
                //target: 'http://10.100.214.71:8080',//测试
                // target: 'http://192.168.1.133:8081',//有
                //target: 'http://192.168.1.128:8082',//有(新)
                //target: 'http://192.168.1.106:8080', //旦
                target: 'http://192.168.1.22:8080', //富强
                //target: 'http://10.100.214.172:8082', //良
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].favicon = './public/favicon.ico'
                args[0].title = '广东省武术协会'
                return args
            })
    },
    // pwa: {
    //   iconPaths: {
    //     favicon32: 'favicon.ico',
    //     favicon16: 'favicon.ico',
    //     appleTouchIcon: 'favicon.ico',
    //     maskIcon: 'favicon.ico',
    //     msTileImage: 'favicon.ico'
    //   }
    // }

}
