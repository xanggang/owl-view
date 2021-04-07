const glob = require('glob')
const path = require('path')
const fs = require('fs')
const http = require('http')
const packagePath = process.cwd()
const apiKey = process.env.VUE_APP_API_OWL_KEY

module.exports = class {
  constructor (option = {}) {
    if (!option.uploadUrl) {
      throw new Error('请输入uploadUrl')
    }
    this.uploadUrl = option.uploadUrl
  }

  apply (compiler) {
    if (process.env.NODE_ENV !== 'production') return
    if (!apiKey) return
    compiler.hooks.done.tap('upload-sourcemap-plugin', async e => {
      const _path = e.compilation.options.output.path
      const list = glob.sync(path.join(_path, './**/*.{js.map,}'))
      for (const i of list) {
        await this.upload(i)
          .catch(e => {
            console.error(e)
          })
      }
    })
  }

  upload (filePath) {
    // eslint-disable-next-line no-console
    console.log('上传' + filePath)
    return new Promise((resolve, reject) => {
      const url = `${this.uploadUrl}?fileName=${path.basename(filePath)}&apiKey=${apiKey}`
      const option = {
        method: 'POST', // 请求类型
        headers: { // 请求头
          'Content-Type': 'application/octet-stream', // 数据格式为二进制数据流
          'Transfer-Encoding': 'chunked', // 传输方式为分片传输
          Connection: 'keep-alive' // 这个比较重要为保持链接。
        }
      }

      const req = http.request(url, option, res => {
        if (res.statusCode !== 200) {
          res.on('data', (chunk) => {
            console.error(`响应主体: ${chunk}`)
          })
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`${filePath}上传失败`)
        } else {
          resolve(filePath)
          req.abort()
        }
      })
      req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`)
      })
      fs.createReadStream(filePath)
        .on('data', chunk => {
          req.write(chunk)
        })
        .on('end', (res) => {
          req.end()
          resolve(res)
        })
    })
  }
}
