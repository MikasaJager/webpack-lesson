const glob = require('glob')
const files = glob.sync('./src/**/*.{js,jpg,png}')
const fs = require('fs')
// './src/*' 匹配src文件夹下的第一层文件 
// [
//   './src/images',
//   './src/index.html',
//   './src/index.js',
//   './src/login.js',
//   './src/style.css'
// ]

// './src/*/' 匹配src文件下的第一层文件夹
// [ './src/images/' ]

// './src/** ' 匹配src文件下的所有文件和文件夹 包含当前文件夹
// [
//   './src',
//   './src/images',
//   './src/images/duck.jpg',
//   './src/images/duckduck',
//   './src/index.html',
//   './src/index.js',
//   './src/login.js',
//   './src/style.css'
// ]

// './src/**/'  匹配src文件夹下面的所有文件夹 
// [ './src/', './src/images/', './src/images/duckduck/' ]

// './src/**/*'  匹配src文件下的所有文件和文件夹 不包含当前文件夹
// [
//   './src/images',
//   './src/images/duck.jpg',
//   './src/images/duckduck',
//   './src/index.html',
//   './src/index.js',
//   './src/login.js',
//   './src/style.css'
// ]
console.log(files)
