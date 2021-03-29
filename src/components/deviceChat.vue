<template>
  <div class="chat-wrap">
    <div ref="char" class="chat"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'


const optionBase = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },

      labelLine: {
        show: false
      },
      data: []
    }
  ]
};

export default {
  name: 'performanceChat',
  props: {
    chartDatas: Array
  },
  watch: {
    chartDatas: {
      immediate: false,
      handler () {
        this.init()
      }
    }
  },
  mounted () {
    const chartDom = this.$refs.char
    this.myChart = echarts.init(chartDom)
    this.init()
  },
  methods: {
    init () {
      if (!this.myChart) return

      const option = {
        ...optionBase
      }
      option.series[0].data = this.chartDatas.map(item => {
        return {
          name: item.device_browser_name,
          value: item.pv
        }
      })
      this.myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
.chat-wrap {
  width: 100%;
  height: 100%;
  .chat {
    width: 100%;
    height: 100%;
  }
}
</style>
