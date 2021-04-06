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
      <el-tag class="tag" v-if="logDetail.device_os_name">操作系统： {{ logDetail.device_os_name }}</el-tag>
      <el-tag class="tag" v-if="logDetail.device_os_version">系统版本： {{ logDetail.device_os_version }}</el-tag>
      <el-tag class="tag" v-if="logDetail.device_browser_name">浏览器名称： {{ logDetail.device_browser_name }}</el-tag>
      <el-tag class="tag" v-if="logDetail.device_browser_version">浏览器版本： {{ logDetail.device_browser_version }}</el-tag>
      <el-tag class="tag" v-if="logDetail.device_engine_name">浏览器内核： {{ logDetail.device_engine_name }}</el-tag>
      <el-tag class="tag" v-if="logDetail.device_engine_version">浏览器内核版本： {{ logDetail.device_engine_version }}</el-tag>

      <el-collapse accordion class="content-warp">
        <el-collapse-item>
          <div slot="title" class="collapse-title">
            错误内容<i class="header-icon el-icon-info"></i>
          </div>
          <div class="log-container" v-html="logDetail.err_content"></div>
        </el-collapse-item>

        <el-collapse-item>
          <div slot="title" class="collapse-title">
            用户行为<i class="header-icon el-icon-info"></i>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in logDetail.breadcrumbs"
              :key="index"
              :timestamp="activity.timestamp"
            >
              <ErrorBreadcrumbs :item="activity"></ErrorBreadcrumbs>
            </el-timeline-item>
          </el-timeline>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { getLogDetail } from '../api/api'
import ErrorBreadcrumbs from '../components/error-breadcrumbs'
import dayjs from 'dayjs'

export default {
  name: 'device',
  components: { ErrorBreadcrumbs },
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
      const res = await getLogDetail({ id: this.$route.params.id })
      res.breadcrumbs = res.breadcrumbs ? JSON.parse(res.breadcrumbs) : []
      res.breadcrumbs = res.breadcrumbs.reduce((tol, cur) => {
        return tol.concat(cur.behavior)
      }, [])
      res.breadcrumbs.forEach(obj => {
        obj.timestamp = dayjs(obj.happenTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.logDetail = res
      this.loading = false
    },

    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>

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
  }

  .content {
    .tag {
      margin-right: 15px;
      margin-top: 10px;
    }
  }

  .content-warp {
    margin-top: 20px;

    .collapse-title {
      font-size: 18px;
      font-weight: normal;

      & > i {
        margin-left: 5px;
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
    }
  }
</style>

<style lang="less">

.log-container {

  .red {
    color: #f56c6c!important;
  }

  pre {
    margin-top: 4px;
  }
}
</style>
