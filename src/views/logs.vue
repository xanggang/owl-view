<template>
  <div>
    <Search @submit="handleSearchParChange"></Search>

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
      :current-page.sync="page"
      current-page.sync="page-page"
      :total="total"
      @current-change="search"
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
    handleSearchParChange (data) {
      this.page = 1
      this.searchData = data
      this.search()
    },
    async search () {
      this.loading = true
      const res = await getLogList({
        ...this.searchData,
        page: this.page
      })
      this.tableData = res.rows
      this.total = res.count
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
