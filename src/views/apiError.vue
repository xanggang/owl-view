<template>
  <div>
    <Search @submit="handleSearchParChange"></Search>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="url"
        label="url"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="status"
      >
      </el-table-column>
      <el-table-column
        prop="request"
        label="request"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="total"
      >
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
import * as Api from '../api/api'

export default {
  name: 'apiError',
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
        path: `./api/${row.id}`
      })
    },
    handleSearchParChange (data) {
      this.page = 1
      this.searchData = data
      this.search()
    },
    async search () {
      this.loading = true
      const res = await Api.getApiErrorsStatistics({
        ...this.searchData,
        page: this.page,
        limit: 20
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
