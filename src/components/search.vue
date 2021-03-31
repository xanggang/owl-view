<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="select-box">
          <span>项目名称</span>
          <el-select v-model="appId" placeholder="请选择">
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.app_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="10">
        <div class="select-box">
          <span>选择时间</span>
          <el-date-picker
            style="width: 500px;"
            type="datetimerange"
            v-model="date"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-col>

      <el-col :span="4">
        <el-button style="margin-left: 15px" @click="submit">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getProjectList } from '../api/api'
export default {
  name: 'logs',
  data () {
    return {
      appId: '',
      date: [
        dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().format('YYYY-MM-DD HH:mm:ss')
      ],
      projectList: []
    }
  },
  async mounted () {
    await this.getProjectList()
  },
  methods: {
    submit () {
      this.$emit('submit', {
        projectId: this.appId,
        startTime: this.date[0],
        endTime: this.date[1]
      })
    },
    async getProjectList () {
      this.projectList = await getProjectList()
      if (this.projectList.length) {
        this.appId = this.projectList[0].id
        this.submit()
      }
    }
  }
}
</script>

<style scoped lang="less">
.select-box {
  display: flex;
  align-items: center;
  margin-right: 10px;
  & > span {
    display: inline-block;
    flex-shrink: 0;
    text-align: left;
    margin-right: 10px;
  }

  & /deep/ .date-picker,
  & /deep/ .issue-label-select,
  & /deep/ .evaluate-select,
  & /deep/ .cloud-spot-grass-select,
  & /deep/ .quality-select,
  & /deep/ .el-select,
  & /deep/ .return-select,
  & /deep/ .cloud-spot,
  & /deep/ .el-cascader {
    width: 100%;
  }
}
</style>
