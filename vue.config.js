const Dotenv = require('dotenv-webpack')

module.exports = {
    publicPath: 'https://recipesharingfrontend.onrender.com',//'http://localhost:8080',
    //outputDir: '../static/dist',
    //indexPath: '../../templates/_base_vue.html',

    configureWebpack: {
        devServer: {
            devMiddleware: {
                writeToDisk: true
            }
        },
        plugins: [
            new Dotenv()
        ]
    }
}
