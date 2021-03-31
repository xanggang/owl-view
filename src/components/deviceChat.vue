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
    orient: 'vertical',
    top: 'top',
    left: 'left',
    data: []
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      center: ['40%', '60%'],
      data: []
    },
    {
      name: '访问来源2',
      center: ['80%', '60%'],
      type: 'pie',
      data: []
    }
  ]
}

export default {
  name: 'deviceChat',
  props: {
    chartDatas: Array
  },
  watch: {
    chartDatas: {
      immediate: true,
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
      const chartDatas = [...this.chartDatas]
      const option = {
        ...optionBase
      }
      let maxItemIndex = -1
      let maxValue = -1
      for (let i = 0; i < this.chartDatas.length; i++) {
        const current = this.chartDatas[i]
        if (Number(current.value) > maxValue) {
          maxItemIndex = i
          maxValue = Number(current.value)
        }
      }
      const maxItem = chartDatas.splice(maxItemIndex, 1)
      if (!maxItem.length) return
      option.legend.data = this.chartDatas.map(d => d.name)
      option.series[0].data = [
        {
          name: maxItem[0].name,
          value: maxItem[0].value
        },
        {
          name: '其他',
          value: chartDatas.reduce((tol, cur) => {
            return tol + Number(cur.value || 0)
          }, 0)
        }
      ]
      option.series[1].data = chartDatas.map(item => {
        return {
          name: item.name,
          value: item.value
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
