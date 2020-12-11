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
   2. output里面不能使用contenthash和chunkhash,只能用hash
   3. hash代表本次编译的结果,所有产出的资源hash都一样,只要有一个入口文件变化那么chunk就会变化
   4. chunkhash表示代码块chunk的hash,一般来说每个entry都会产出一个chunk
   5. contenthash表示文件的内容hash,文件内容不变那么contenthash就不会变
7. 引入图片
   1. file-loader url-loader
   2. file-loader的作用就是把文件拷贝到output中,然后改个名字把路径返回
   3. url-loader内置了file-loader,它会判断文件的大小,如果小于限制的话会变成base64.
   4. 在css中引入图片,使用的是css-loader

## 20201210
1. 分离css
   1. 因为css的下载和js可以并行处理,如果css太大的话我们可以抽取出来使其并行下载
   2. 使用mini-css-extract-plugin来分离css到单独的文件中
2.  压缩css和js
   3. terser-webpack-plugin用来压缩js
   4. optimize-css-assets-webpack-plugin 用来压缩css