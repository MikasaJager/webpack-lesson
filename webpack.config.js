const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development', // 因为开发环境和生产环境的webpack配置有很多不一样,所以就用mode区分不同的环境
  entry: {
    // entry里面的key就是chunk的名称
    // chunk是由多个模块组成的
    index: './src/index.js', // chunk index
    login: './src/login.js' // chunk login
  },
  output: {
    path: path.join(__dirname, 'dist'), // 输出的目录,只能是绝对路径
    // [xxx]是中的xxx变量的意思
    // [name]在多入口的情况下name是entry的key,在单入口的情况下name是main
    // [hash]是文件的指纹,打包之后的所有文件的都是一样的 ,[hash:8] 冒号后面的是hash的长度
    // hash的作用是为了防止缓存,当内容变化的时候hash会不同,这样就会读取新的文件
    // [chunkhash] 
    // [contenthash]
    filename: '[name].[hash:8].js',
    publicPath: '/' //设置根路径,会赋值给打包后的webpack.p
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 如果require或者import的文件是一个css文件,那么就使用
        // MiniCssExtractPlugin.loader收集所有的css文件
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        // file-loader的作用其实就是将图片拷贝到output目录下,然后将其路径给我们
        use: {
          loader: 'url-loader',
          options: {
            // 如果要加载的图片大小小于10K的话,就把这张图片转成base64编码
            limit: 10 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    // 这个插件是产出html文件,就不用我们在dist目录里面手写html文件了
    // 这个插件会帮我们在html里面自动插入output里面的文件
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定模板文件
      filename: 'index.html',
      hash: true, //为了避免缓存,可以在产出的资源后面添加hash值,因为浏览器的缓存是依靠url的,如果产生的hash不同,那么url也不同,这样做就可以避免缓存旧文件
      chunks: ['index', 'common'], // 如果不写chunks的话那么会在产出的html里面写入所有chunks的资源(多入口情况下会将entry里的所有chunk插入到html中)
      chunksSortMode: 'manual' // 对引入的代码块进行排序,'manual'情况下是根据entry里面chunk的顺序来插入的
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css', // name 是当前chunk的名字
      chunkFilename: '[id].css' // 在异步加载的时候用的 后续会补充
    })
  ]
}
