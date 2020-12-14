# 学习记录
## 20201209
1. 完成webpack.config.js简单配置
2. 使用webpack-dev-server
   1. 如果使用了webpack-dev-server,所有产出的文件都会写到内存里,而不是写入到磁盘上
   2. 自己实现了一套memoryfs模块把文件写到了内存里面
3. 了解了loader的使用方法
4. 多入口和单入口的区别以及output filename的变量以及变量的含义及用法(`[name]` `[hash:8]` `[contenthash]` `[chunkhash]`)
   1. 多入口的意思就是打包生成多个代码块,entry的值可以是入口文件,也可以是数组
5. htmlwebpackplugin插件的使用
6. hash值的作用和不同hash值的区别
   1. hash值的作用是为了缓存结果,因为浏览器是根据资源的url地址来缓存资源的,如果数据发生变化hash值也会跟着变化,这样就可以避免缓存旧文件
   2. hash代表本次编译的结果,所有产出的资源hash都一样,只要有一个入口文件变化那么chunk就会变化
   3. chunkhash表示代码块chunk的hash,一般来说每个entry都会产出一个chunk
   4. contenthash表示文件的内容hash,文件内容不变那么contenthash就不会变
7. 引入图片
   1. file-loader url-loader
   2. file-loader的作用就是把文件拷贝到output中,然后改个名字把路径返回
   3. url-loader内置了file-loader,它会判断文件的大小,如果小于限制的话会变成base64.
   4. 在css中引入图片,使用的是css-loader,如果css文件里面有图片的话也会使用file-loader或者url-loader

## 20201210
1. 分离css
   1. 因为css的下载和js可以并行处理,如果css太大的话我们可以抽取出来使其并行下载
   2. 使用mini-css-extract-plugin来分离css到单独的文件中
2.  压缩css和js
   3. terser-webpack-plugin用来压缩js
   4. optimize-css-assets-webpack-plugin 用来压缩css

## 20201212
1. 使用less 和 sass

## 20201213
1. 转译es6/es7: babel-loader(webpack loader) @babel/core(核心) @babel/preset-env(预设,将es6 es7转成es5) @babel/preset-react 
2. 预设的意思就是将插件打包,成为一个预设,如果不这样做的话那么在babel-loader的options里的plugins里面一个个写很麻烦.
3. loader的参数既可以写在webpack.config.js里面,也可以写.xxxrc,也可以写在package.json里面
4. devtool
   1. eval
   2. module能看到编译前的代码,比如babel转译前的代码,
   3. #sourceURLXXX这个是浏览器来识别的
5. 打包第三方类库
   1. 使用providePlugin这个插件可以无需使用import或者require来声明,直接使用.不过这是向当前模块注入的局部变量,不能全局使用
   2. 如果我们想向全局注入一个对象的话需要expose-loader,这个包的作用是之后可以在控制台用全局变量打印依赖
   3. externals可以让我们引用一个库但是又不让webpack打包,并且又不影响我们在程序中以amd cmd 全局引用方式来进行使用
      1. 在模板html中使用script来将模块引入
      2. 在externals中配置
      3. 使用html-wepack-externals-plugin来实现外链plugin,就不用自己写externals和在html中写cdn了
6. 代理服务器
   1. webpack.config.js里面有一个devServer属性
7. resolve 定制模块的查找规则
8. resolveLoader是用来查找loader的,如果自定义了loader那么就可以使用这个字段来告诉webpack去哪里查找自定义的loader
9.  module.noPase告诉webpack哪些模块是不用解析的,如果有些模块是没有依赖的就可以使用这个属性
10. DefinePlugin是用来将config里面的键值对挂载到全局变量上
11. 区分环境变量
    1.  用mode来区分开发环境和线上环境
        1.  在package.json的scripts里面不同命令指定不同的环境参数,而不是在webpack.config.js里面硬编码mode
12. 拆分webpack配置 在scripts里面通过 --config xxx.js 用来指定config文件
    1.  base
    2.  dev 
    3.  prod
13. MPA 多入口应用
    1.  用glob匹配所有出来所有的entries,将entries循环放入数组中
    2.  根据entries生成htmlWebpackPlugins 