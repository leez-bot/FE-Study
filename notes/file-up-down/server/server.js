const http = require("http")
const server = http.createServer()
const path = require("path")
const multiparty = require('multiparty')

const UPLOAD_DIR = path.resolve(__dirname, '..', 'target') // 文件存储目录

server.on('request', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  if (req.method = "OPTIONS") {
    res.status = 200
    res.end()
    return
  }

  if (req.url === '/merge') {
    const data = await resolvePost(req)
    const { filename } = data
    const filePath = `${UPLOAD_DIR}/${filename}`
    await mergeFileChunk(filePath, filename)
    res.end(JSON.stringify({
      code: 0,
      message: '文件合并完成'
    }))
  }
  // 使用 multiparty 包处理前端传来的 FormData，
  // 在 multiparty.parse 的回调中，files 参数保存了 FormData 中文件，fields 参数保存了 FormData 中非文件的字段：
  const multipart = new multiparty.Form();
  multipart.parse(req, async (err, fields, files) => {
    if (err) return
    const [chunk] = files.chunk
    const [hash] = fields.hash
    const [filename] = fields.filename
    const chunkDir = `${UPLOAD_DIR}/${filename}`
    // 如果切片目录不存在，则创建目录
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    }
    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    await fse.move(chunk.path, `${chunkDir}/${hash}`)
    res.end('received file chunk')
  })
})

// 合并切片
const resolvePost = req => {
  new Promise(resolve => {
    let chunk = ""
    req.on('data', data => {
      chunk += data
    })
    req.on('end', () => {
      resolve(JSON.parse(chunk))
    })
  })
}
const mergeFileChunk = async (filePath, filename) => {
  const chunkDir = `${UPLOAD_DIR}/${filename}`
  const chunkPaths = await fse.readdir(chunkDir)
  await fse.writeFile(filePath, "")
  chunkPaths.forEach(chunkPath => {
    fse.appendFileSync(filePath, fse.readFileSync(`${chunkDir}/${chunkPath}`))
    fse.unlinkSync(`${chunkDir}/${chunkPath}`)
  })
  fse.rmdirSync(chunkDir)
}

server.listen(3000, () => console.log('正在监听3000端口'))