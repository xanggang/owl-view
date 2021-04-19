<template>
  <div>
    <Search @submit="handleSearchParChange"></Search>
    <el-tabs v-model="type" class="tabs" @tab-click="search">
      <el-tab-pane label="按浏览器" name="device_browser_name">
      </el-tab-pane>
      <el-tab-pane label="内核" name="device_engine_name">
      </el-tab-pane>
      <el-tab-pane label="操作系统" name="device_os_name">
      </el-tab-pane>
    </el-tabs>
    <deviceChat v-if="chartData.length" :chartDatas="chartData" class="chat"></deviceChat>
    <div v-else class="no-data">
      <no-data></no-data>
    </div>
  </div>
</template>

<script>
import { getDeviceStatistics } from '../api/api'
import Search from '../components/search'
import deviceChat from '../components/deviceChat'
import NoData from '../components/nodata'
export default {
  name: 'device',
  components: { Search, deviceChat, NoData },
  data () {
    return {
      type: 'device_browser_name', // device_engine_name device_os_name
      searchData: {},
      chartData: []
    }
  },
  methods: {
    handleSearchParChange (data) {
      this.searchData = data
      this.search()
    },
    async search () {
      const res = await getDeviceStatistics({
        ...this.searchData,
        type: this.type
      })
      this.chartData = res
    }
  }
}
</script>

<style lang="less" scoped>
.tabs {
  margin-top: 30px;
}
.chat {
  width: 80%;
  height: 350px;
  margin-top: 20px;
}

.no-data {
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
