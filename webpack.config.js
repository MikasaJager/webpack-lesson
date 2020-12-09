const path = require('path')
module.exports = {
  mode: 'development', // 因为开发环境和生产环境的webpack配置有很多不一样,所以就用mode区分不同的环境
  entry: './src/index.js', // 入口文件,从这里开始解析模块的依赖,相对路径
  output: {
    path: path.join(__dirname, 'dist'), // 输出的目录,只能是绝对路径
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 如果require或者import的文件是一个css文件,那么就使用
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
