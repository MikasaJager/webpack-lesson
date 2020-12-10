# 学习记录
## 20201209
1. 完成webpack.config.js简单配置
2. 使用webpack-dev-server
   1. 如果使用了webpack-dev-server,所有产出的文件都会写到内存里,而不是写入到磁盘上
   2. 自己实现了一套memoryfs模块把文件写到了内存里面
3. 了解了loader的使用方法
4. 多入口和单入口的区别以及output filename的变量以及变量的含义及用法(`[name]` `[hash:8]` `[contenthash]` `[chunkhash]`)
5. htmlwebpackplugin插件的使用
6. 引入图片
   1. file-loader url-loader
   2. file-loader的作用就是把文件拷贝到output中,然后改个名字把路径返回
   3. url-loader内置了file-loader,它会判断文件的大小,如果小于限制的话会变成base64.
   4. 在css中引入图片,使用的是css-loader
7. 分离css
   1. 因为css的下载和js可以并行处理,如果css太大的话我们可以抽取出来加速加载
   2. 使用mini-css-extract-plugin不使用style-loader