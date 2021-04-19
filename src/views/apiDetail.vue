<template>
  <div v-loading="loading" class="api-detail-wrap">
    <el-page-header @back="goBack" content="  接口详情页"></el-page-header>
    <div class="content">
      <div class="content-l">
        <div class="api-info">
          <p class="info-title">请求接口地址：</p>
          <div class="info-data" v-if="!!msg.url">
            {{ msg['url'] }}
          </div>
          <div class="info-data" v-else>/</div>
        </div>
        <div class="api-info">
          <p class="info-title">请求参数：</p>
          <div class="info-data" v-if="!!msg.request">
            {{ msg['request']['body'] }}
          </div>
          <div class="info-data" v-else>/</div>
        </div>
        <div class="api-info">
          <p class="info-title">接口返回值：</p>
          <div class="info-data" v-if="!!msg.response">
            {{ msg.response }}
          </div>
          <div class="info-data" v-else>/</div>
        </div>
      </div>
      <div class="content-r">
        <div class="api-infos">
          <div class="api-infos-title">
            Api Detail
          </div>
          <div class="api-info">
            <div class="info-title">项目名：</div>
            <span class="info-data" v-if="!!msg.project">{{ msg['project_id'] }}</span>
            <span v-else>/</span>
          </div>
          <div class="api-info">
            <div class="info-title">请求时间：</div>
            <span class="info-data" v-if="!!getDate">{{ getDate }}</span>
            <span v-else>/</span>
          </div>
          <div class="api-info">
            <div class="info-title">请求ip地址：</div>
            <span class="info-data" v-if="!!msg.ip">{{ msg['ip'] }}</span>
            <span v-else>/</span>
          </div>
          <div class="api-info">
            <div class="info-title">请求状态码：</div>
            <span class="info-data" v-if="!!msg.status"> {{ msg.status }}</span>
            <span v-else>/</span>
          </div>
          <div class="api-info">
            <div class="info-title">请求方法：</div>
            <span class="info-data" v-if="!!msg.request"> {{ msg.request.method }}</span>
            <span v-else>/</span>
          </div>
        </div>
        <div class="api-infos request-header">
          <div class="api-infos-title">
            Request Headers
          </div>
          <div class="api-info">
            <div class="info-title">accept：</div>
            <span class="info-data" v-if="!!msg.headers">{{ msg.headers.Accept }}</span>
            <span v-else>/</span>
          </div>
          <div class="api-info">
            <div class="info-title">content-type：</div>
            <span class="info-data" v-if="!!msg.headers">{{ msg.headers['Content-Type'] }}</span>
            <span v-else>/</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import * as Api from '../api/api'

export default {
  data () {
    return {
      msg: {},
      loading: false
    }
  },
  mounted () {
    this.getApiDatail()
  },
  computed: {
    project () {
      return this.$route.params.project
    },
    getDate: function () {
      return dayjs(+this.msg.request_time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'Api' })
    },
    async getApiDatail () {
      this.loading = true
      const res = await Api.apiErrorsDetail({
        id: this.$route.params.id
      })
      res.headers = res.headers && JSON.parse(res.headers)
      res.request = res.request && JSON.parse(res.request)
      this.msg = res
      this.loading = false
    },
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.api-detail-wrap {
  padding: 0 24px;
  background-color: #fff;
  color: #000;
  font-weight: 350;

  header {
    display: flex;
    flex-direction: row;
    height: 60px;
    line-height: 60px;
    border-bottom: 2px solid #D2D7DC;
    background: #fafafa;

    .back {
      cursor: pointer;
      line-height: 60px;
      margin-left: 5px;

      .back-ico {
        width: 40px;
        font-weight: 600;
        font-size: 20px;
      }
    }

    .title {
      line-height: 60px;
      margin-left: 20px;
      font-size: 20px;
      font-weight: 600;
    }
  }

  .content {
    display: flex;
    flex-direction: row;
    padding-top: 20px;

    .content-l {
      width: 600px;
      border: 1px solid #E8E8E8;
      border-radius: 5px;

      .api-info {
        word-wrap: break-word;
        margin-bottom: 40px;

        .info-title {
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
          background-color: #fafafa;
          font-size: 16px;
          border-bottom: 1px solid #E8E8E8;

          &:first-child {
            border-radius: 5px 5px 0 0;
          }
        }

        .info-data {
          padding: 20px 10px;
        }
      }
    }

    .content-r {
      flex: 1;
      padding-left: 20px;

      .api-infos {
        border: 1px solid #E8E8E8;
        border-radius: 10px;
        margin-bottom: 20px;
        overflow: hidden;

        .api-infos-title {
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
          background-color: #fafafa;
        }

        .api-info {
          display: flex;
          flex-direction: row;
          margin-top: 10px;
          border-bottom: 1px solid #E8E8E8;

          .info-title {
            width: 130px;
            height: 30px;
            padding-left: 10px;
            line-height: 30px;
            border-radius: 5px;
            background-color: #fafafa;
            text-align: left;
            color: #000;
          }

          .info-data {
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
          }
        }

        &.request-header {
          .info-title {
            width: 120px;
          }
        }
      }


    }

  }
}
</style>
