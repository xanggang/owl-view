// const uploadSourceMapWebPlugin = require('./src/tool')
module.exports = {
  lintOnSave: true, // eslint 错误处理，true表示对待eslint错误为warning，warning不会导致编译失败
  configureWebpack: {
    // plugins: [
    //   // eslint-disable-next-line new-cap
    //   new uploadSourceMapWebPlugin({
    //     uploadUrl: process.env.VUE_APP_FILE_UPLOAD_URL
    //   })
    // ]
  }
}
