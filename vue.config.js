const Dotenv = require('dotenv-webpack')
const PUBLIC_PATH = process.env.VUE_APP_PUBLIC_PATH

module.exports = {
    publicPath: PUBLIC_PATH,//'http://localhost:8080',
    //outputDir: '../static/dist',
    //indexPath: '../../templates/_base_vue.html',

    configureWebpack: {
        devServer: {
            devMiddleware: {
                writeToDisk: true
            },
            proxy: PUBLIC_PATH
        },
        plugins: [
            new Dotenv()
        ]
    }
}
