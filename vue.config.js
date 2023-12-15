const Dotenv = require('dotenv-webpack')
const PUBLIC_PATH = process.env.VUE_APP_PUBLIC_PATH
const URL_BACKEND = process.env.VUE_APP_URL_BACKEND

module.exports = {
    publicPath: PUBLIC_PATH,//'http://localhost:8080',
    //outputDir: '../static/dist',
    //indexPath: '../../templates/_base_vue.html',

    configureWebpack: {
        devServer: {
            devMiddleware: {
                writeToDisk: true
            },
            proxy: URL_BACKEND
        },
        plugins: [
            new Dotenv()
        ]
    }
}
