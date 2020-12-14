const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin') // 用来压缩js,可以压缩es6
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css文件
module.exports = {
  mode: 'development', // 因为开发环境和生产环境的webpack配置有很多不一样,所以就用mode区分不同的环境
  entry: {
    // entry里面的key就是chunk的名称
    // chunk是由多个模块组成的
    index: './src/index.js', // chunk index
    vendor: ['react', 'react-dom'] // 支持正则,将node_modules里面的模块都放到vendor chunk里面去
  },
  // 定制文件查找的规则
  resolve: {
    // 引用模块如果没有写后缀时的匹配规则
    extensions: ['.js', '.jsx', '.json', '.css'],
    // 如果引用的模块在alias里面设置了,那么他就会直接读取alias里面设置的值
    // alias: {
    //   'bootstrap':path.join()
    // }
  },
  // 默认false,也就是不开启,开启之后命令行会一直处于监听状态,监听文件的变化,如果发生变化就会重新执行打包
  watch: false,
  //只有开启监听模式时，watchOptions才有意义
  watchOptions: {
    // 默认为空，不监听的文件或者文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行，默认300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的询问文件系统指定议是有变化实现的，默认每秒问1000次
    poll: 1000
  },
  output: {
    path: path.join(__dirname, 'dist'), // 输出的目录,只能是绝对路径
    // [xxx]是中的xxx变量的意思
    // [name]在多入口的情况下name是entry的key,在单入口的情况下name是main
    // [hash]是文件的指纹,打包之后的所有文件的都是一样的 ,[hash:8] 冒号后面的是hash的长度
    // hash的作用是为了防止缓存,当内容变化的时候hash会不同,这样就会读取新的文件
    // [chunkhash]
    // [contenthash]
    filename: '[name].[chunkhash].js',
    publicPath: '/' //设置根路径,会赋值给打包后的webpack.p,在浏览器访问的时候要以什么路径文件 如果图片路径是xx.jpg 有publicPath会加在前面
  },
  devServer: {
    compress:true, // 相当于启动gzip压缩
    contentBase: path.join(__dirname, 'dist'),
    // 这个before是个钩子,会在web-dev-server启动之前执行
    // webpack-dev-server其实就是一个express
    before (app) {
      // 自己模拟请求
      // app 就是express的实例
      app.get('/api/users', function (req, res) {
        req.json({ name: 'yzh' })
      })
    }
    // proxy: {
    //   // 如果有/api开头的请求,那么就将请求转发
    //   // "/api":'http://localhost:3000',
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     // 路径重写,把/api给去掉
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        // 如果有多个loader校验,enforce:'pre'会强制提前执行,enforce有pre normal post三种
        enforce: 'pre',
        // 只校验自己写的代码,包含关系
        include: path.join(__dirname, 'src'),
        // 排除
        exclude: /node_modules/
      },
      {
        test: /\.css$/, // 如果require或者import的文件是一个css文件,那么就使用
        // MiniCssExtractPlugin.loader收集所有的css文件
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/, // 如果require或者import的文件是一个css文件,那么就使用
        // MiniCssExtractPlugin.loader收集所有的css文件
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/, // 如果require或者import的文件是一个css文件,那么就使用
        // MiniCssExtractPlugin.loader收集所有的css文件
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpg|png|gif|jpeg|svg)$/,
        // file-loader的作用其实就是将图片拷贝到output目录下,然后将其路径给我们
        use: {
          loader: 'url-loader',
          options: {
            // 如果要加载的图片大小小于10K的话,就把这张图片转成base64编码
            limit: 10 * 1024,
            outputPath: 'images', // dist下面的路径 物理路径
            publicPath: '/images' // url路径
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
      chunksSortMode: 'manual' // 对引入的代码块进行排序,'manual'情况下是根据chunks👆这行数组的顺序来的
    }),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css', // name 是当前chunk的名字
      chunkFilename: '[id].css' // 在异步加载的时候用的 后续会补充
    })
  ],
  optimization: {
    // 这个选项的作用是对chunk做优化
    minimizer: [
      // 这里放优化的插件
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin({
        assetNameRegExp: /\.css$/g // 指定要压缩的模块正则
      }),
      new CleanWebpackPlugin()
    ]
  }
}
