const shell = require('shelljs')
const fs = require("fs");
const path = require('path')
const colors = require('colors-console')
 
const readDir = fs.readdirSync(__dirname + '/src/views');
// console.log(readDir);
let successCount = 0
let failCount = 0
let failMsg = ''
readDir.map(fileName => {
    bundleFile(fileName)
})
console.log(`所有打包完成,成功${successCount}个,失败${failCount}个`)
if (failMsg.length) {
    console.error('失败原因：' + colors('red', failMsg.substr(0, failMsg.length - 1)))
}

function bundleFile (fileName) {
    console.log('-------开始打包'+fileName+'页面-------')
    const src = `src/views/${fileName}`
    const rmSrc = `bundle/${fileName}`
    let files = []
    let entryName = ''
    files = fs.readdirSync(src).filter(file => {
        return path.extname(file) === '.vue' && file === 'index.vue' || file === 'app.vue' || file === `${fileName}.vue`
    })
    if (!files.length) {
        failCount++
        let msg = `${src}目录下无打包入口文件,打包失败,`
        failMsg += msg
        console.error(colors('red', msg.substr(0, msg.length - 1)))
        return
    }
    if (files.includes('index.vue')) {
        entryName = 'index.vue'
    } else if (files.includes('app.vue')) {
        entryName = 'app.vue'
    } else {
        entryName = `${fileName}.vue`
    }
    const buildCommand = `vue build ${src}/${entryName} -d ${fileName}`
    shell.rm('-rf', rmSrc)
    shell.exec(buildCommand)
    shell.mv(fileName, 'bundle')
    successCount++
    console.log('-------'+fileName+'页面打包完成-------')
}
