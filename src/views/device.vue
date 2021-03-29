<template>
  <div>
    <Search @submit="search"></Search>
    <deviceChat :chartDatas="chartData" style="width: 1000px; height: 300px;"></deviceChat>
  </div>
</template>

<script>
import { getDeviceStatistics } from '../api/api'
import Search from '../components/search'
import deviceChat from '../components/deviceChat'
export default {
  name: 'device',
  components: { Search, deviceChat },
  data () {
    return {
      type: 'device_browser_name', // device_engine_name device_os_name
      chartData: []
    }
  },
  methods: {
    async search (par) {
      const res = await getDeviceStatistics({
        ...par,
        type: this.type
      })
      this.chartData = res.data
      console.log(res);
    }
  }
}
</script>

<style scoped>

</style>
