<template>
  <div>
    <Search appName @submit="search"></Search>
    <PerformanceChat class="chat" :chartDatas="infos"></PerformanceChat>
  </div>
</template>

<script>
import Search from '../components/search'
import { getPerformanceAvg } from '../api/api'
import PerformanceChat from '../components/performanceChat'

export default {
  name: 'performance',
  components: { Search, PerformanceChat },
  data () {
    return {
      infos: {}
    }
  },
  methods: {
    async search (par) {
      const res = await getPerformanceAvg(par)
      const data = res?.[0] || {}
      this.infos = data
    }
  }
}
</script>

<style scoped>

.chat {
  width: 100%;
  height: 500px;
  margin-top: 30px;
}
</style>
