<template>
  <div>
    <Search @submit="search"></Search>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="app_name"
        label="项目名称"
        width="200px"
      >
      </el-table-column>

      <el-table-column
        prop="err_type"
        label="错误类型"
        width="200px"
      >
      </el-table-column>

      <el-table-column
        prop="err_message"
        label="错误消息"
      >
      </el-table-column>

      <el-table-column
        prop="updatedAt"
        label="最后触发时间"
      >
      </el-table-column>

      <el-table-column
        prop="updated_at"
        label="total"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.logDetails.length }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :page-size="10"
      current-page.sync="page-page"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import Search from '../components/search'
import { getLogList } from '../api/api'
export default {
  name: 'logs',
  components: { Search },
  data () {
    return {
      loading: false,
      tableData: [],
      searchData: {
        app_name: '',
        startTime: '',
        endTime: ''
      },
      logList: [],
      total: 0,
      page: 1
    }
  },
  methods: {
    handleClick (row) {
      this.$router.push({
        path: `./detail/${row.id}`
      })
    },
    async search (data) {
      const a = {
        appId: 'owl-view',
        startTime: '2021-02-01 14:24:32',
        endTime: '2021-04-01 14:24:32'
      }
      this.loading = true
      this.page = 1
      this.searchData = {
        ...(data || a),
        page: 1
      }
      const res = await getLogList(this.searchData)
      this.tableData = res.rows
      this.total = res.count
      this.loading = false
    }
  },
  async mounted () {
    await this.search()
  }
}
</script>

<style scoped>

</style>
