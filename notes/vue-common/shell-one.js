const shell = require('shelljs')
const fs = require("fs");
const path = require('path')
const colors = require('colors-console')

const bundledPages = ['test', 'index']

bundledPages.map(item => {
    const src = `src/views/${item}`
    const fileName = item
    bundleFile(src, fileName)
})

function bundleFile (src, fileName) {
    console.log('-------开始打包'+fileName+'页面-------')
    const rmSrc = `bundle/${fileName}`
    let files = []
    let entryName = ''
    files = fs.readdirSync(src).filter(file => {
        return path.extname(file) === '.vue' && file === 'index.vue' || file === 'app.vue' || file === `${fileName}.vue`
    })
    if (!files.length) {
        console.error(colors('red', `${src}目录下无打包入口文件,打包失败`))
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
    console.log('-------'+fileName+'页面打包完成-------')
}
