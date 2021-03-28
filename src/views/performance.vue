<template>
  <div>
    <Search appName @submit="search"></Search>
    {{ infos }}
  </div>
</template>

<script>
import Search from '../components/search'
import { getPerformanceAvg } from '../api/api'

const columns = [
  {
    title: '重定向',
    dataIndex: 'redirect',
  },
  {
    title: 'DNS缓存',
    dataIndex: 'appcache',
  },
  {
    title: 'DNS查询',
    dataIndex: 'lookup_domainAvg',
  },
  {
    title: '首字节',
    dataIndex: 'ttfb',
  },
  {
    title: 'TCP建立',
    dataIndex: 'connect',
  },
  {
    title: '请求响应',
    dataIndex: 'request',
  },
  {
    title: 'DOM渲染',
    dataIndex: 'dom_ready',
  },
  {
    title: 'load事件',
    dataIndex: 'load_event',
  },
  {
    title: '页面加载完成',
    dataIndex: 'load_page'
  }
]

export default {
  name: 'performance',
  components: { Search },
  data () {
    return {
      infos: {}
    }
  },
  methods: {
    async search (par) {
      const res = await getPerformanceAvg(par)
      const data = res.data?.[0] || {}
      const infos = columns.map(({ title, dataIndex }) => {
        return {
          title,
          dataIndex,
          value: Math.round(data[dataIndex]) || 0
        }
      })
      this.infos = infos
    }
  }
}
</script>

<style scoped>

</style>
