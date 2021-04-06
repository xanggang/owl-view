/* eslint-disable  */
const fs = require('fs')
const path = require('path')
const qiniu = require('qiniu')

const basePath = path.resolve(process.cwd())
const sourcefolder = path.join(basePath, '/dist/')
const appName = 'owl-web'
const canUploadExt = ['.map']
// 要上传的空间
const bucket =  process.env.QINIU_BUCKET
const fileList = []

// 需要填写你的 Access Key 和 Secret Key
const ACCESS_KEY =  process.env.QINIU_ACCESS_KEY
const SECRET_KEY = process.env.QINIU_SECRET_KEY
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY)
const config = new qiniu.conf.Config()
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()

// 生成token
function uptoken (bucket, key) {
  const options = {
    scope: `${bucket}:${appName}/${key}`
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}

// 读取全部文件
function readFileList (dir, filesList = []) {
  const dirExist = fs.existsSync(dir)
  if (!dirExist) return
  const files = fs.readdirSync(dir)
  if (files.length === 0) {
    console.log(`${dir}下没有可读取文件`)
    return
  }
  console.log(`当前目录：${dir}， 文件：${files}}`)
  files.forEach((item, index) => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList) // 递归读取文件
    } else {
      const fileExt = path.extname(item)
      if (canUploadExt.includes(fileExt)) {
        console.log(`文件名：${item}`)
        filesList.push({
          fileName: item,
          path: fullPath
        })
      }
    }
  })
  return filesList
}

// 上传文件
function uploadFile (uptoken, key, localFile) {
  return new Promise((resolve, reject) => {
    formUploader.putFile(uptoken, key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode === 200) {
        resolve(respBody.key + '上传成功')
      } else {
        reject(respBody)
      }
    })
  })
}

// 批量上传
async function uploadFileList () {
  for (const item of fileList) {
    // 生成上传 Token
    const key = appName + '/' + item.fileName
    const token = uptoken(bucket, item.fileName)
    const res = await uploadFile(token, key, item.path)
      .catch(err => {
        console.error(err)
        process.exit(1)
      })
    if (res) {
      console.log(res);
    }
  }
}

readFileList(sourcefolder, fileList)
uploadFileList()
