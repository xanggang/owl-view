<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="15">
          <el-form-item label="项目名">
            <el-select v-model="form.app_name" placeholder="请选择">
              <el-option
                v-for="item in projectList"
                :key="item.id"
                :label="item.app_name"
                :value="item.app_name"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间">
            <el-date-picker
              style="width: 500px;"
              type="datetimerange"
              v-model="form.date"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="9">
          <el-button style="margin-left: 15px" @click="submit">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'logs',
  props: {
    projectList: Array
  },
  data () {
    return {
      form: {
        app_name: '',
        date: [
          dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
          dayjs().format('YYYY-MM-DD HH:mm:ss')
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$emit('submit', {
        app_name: this.form.app_name,
        startTime: this.form.date[0],
        endTime: this.form.date[1]
      })
    }
  }
}
</script>

<style scoped>

</style>
