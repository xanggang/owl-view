<template>
  <div>
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <el-divider></el-divider>
    <div class="header-info">
      <div class="left">
        <span class="message">{{ logDetail.err_message }}</span>
        <el-tag
          type="danger"
          class="type"
          plain
          size="mini"
        >
          {{ logDetail.err_type }}
        </el-tag>
      </div>
    </div>
    <div>
      <el-tag class="tag">文件路径： {{ logDetail.file_path }}</el-tag>
    </div>

    <div class="content">
      <el-tag class="tag" v-if="logDetail.ip">ip： {{ logDetail.ip }}</el-tag>
      <el-tag class="tag" v-if="logDetail.system">操作系统： {{ logDetail.system }}</el-tag>
      <el-tag class="tag" v-if="logDetail.system_version">系统版本： {{ logDetail.system_version }}</el-tag>
      <el-tag class="tag" v-if="logDetail.browser_type">浏览器类型： {{ logDetail.browser_type }}</el-tag>
      <el-tag class="tag" v-if="logDetail.browser_name">浏览器名称： {{ logDetail.browser_name }}</el-tag>
      <el-tag class="tag" v-if="logDetail.browser_version">浏览器版本： {{ logDetail.browser_version }}</el-tag>
      <el-tag class="tag" v-if="logDetail.browser_core">浏览器内核： {{ logDetail.browser_core }}</el-tag>
      <div class="log-container" v-html="logDetail.err_content"></div>
    </div>
  </div>
</template>

<script>
import { getLogDetail } from '../api/api'

export default {
  name: 'device',
  data () {
    return {
      loading: false,
      logDetail: {},
      codeEditor: null
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {

    async getDetail () {
      this.loading = true
      this.logDetail = await getLogDetail({ id: this.$route.params.id })
      this.loading = false
    },

    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">

.errorHighlight {
  color: red!important;
}

  .header-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    margin: 20px 0;
    .message {
      font-size: 18px;
      font-weight: bold;
    }
    .type {
      margin-left: 10px;
    }
    .name {

    }
  }

  .content {
    .tag {
      margin-right: 15px;
      margin-top: 10px;
    }
  }

  .log-container {
    margin-top: 30px;
    padding: 10px;
    background-color: #f0f2f5;
    line-height: 20px;
    font-weight: normal;
    pre {
      margin-top: 10px;
    }
    .red {
      color: red;
    }
  }

</style>
