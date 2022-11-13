const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 部署到Github
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-manage-system/'
    : '/',
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  devServer: {
    proxy: {//配置跨域
        '/address': {
            target: 'http://myip.ipip.net',//获取地址的域名
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/address': ''//以'/address'标识请求用代理，实际请求时重写去掉'/address'
            }
        }
    }
  }
})
