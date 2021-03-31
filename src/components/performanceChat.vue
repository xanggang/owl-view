<template>
  <div class="chat-wrap">
    <div class="info-wrap">
      <div class="info-item" v-for="(item, index) in infos" :key="index">
        <div>{{ item.title }}</div>
        <div><span class="value">{{ item.value }}</span><span>ms</span></div>
      </div>
    </div>
    <div ref="char" class="chat"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

const columns = [
  {
    title: '重定向',
    dataIndex: 'redirect'
  },
  {
    title: 'DNS缓存',
    dataIndex: 'appcache'
  },
  {
    title: 'DNS查询',
    dataIndex: 'lookup_domainAvg'
  },
  {
    title: '首字节',
    dataIndex: 'ttfb'
  },
  {
    title: 'TCP建立',
    dataIndex: 'connect'
  },
  {
    title: '请求响应',
    dataIndex: 'request'
  },
  {
    title: 'DOM渲染',
    dataIndex: 'dom_ready'
  },
  {
    title: 'load事件',
    dataIndex: 'load_event'
  },
  {
    title: '页面加载完成',
    dataIndex: 'load_page'
  }
]

const data = {
  load_page: 652.4,
  dom_ready: 604,
  redirect: 0,
  lookup_domainAvg: 0.2,
  ttfb: 33.6,
  request: 29.4,
  load_event: 0,
  appcache: '0.4000',
  connect: '0.2000'
}

const optionBase = {
  title: {
    // text: '页面加载瀑布图'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
  },
  legend: {
    data: ['重定向', 'DNS缓存', 'DNS查询', '首字节', 'TCP建立', '请求响应', 'DOM渲染', 'load事件', '页面加载完成']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  yAxis: {
    type: 'category',
    splitLine: { show: false },
    data: [
      '重定向', 'DNS缓存', 'DNS查询', '首字节', 'TCP建立', '请求响应', 'DOM渲染', 'load事件', '页面加载完成'
    ]
  },
  xAxis: {
    type: 'value'
  },
  series: [
    {
      name: '总时间',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        barBorderColor: 'rgba(0,0,0,0)',
        color: 'rgba(0,0,0,0)'
      },
      emphasis: {
        itemStyle: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)'
        }
      },
      data: (function () {
        let total = 0
        const list = []
        columns.forEach(col => {
          list.push(total)
          total += Number(data[col.dataIndex]) || 0
        })

        return list
      })()
    },
    ...columns.map((col, index) => {
      return {
        name: col.title,
        type: 'bar',
        stack: '总量',
        label: {
          show: true,
          position: 'top'
        },
        data: (function () {
          const arr = Array(columns.length).fill(0)
          arr[index] = data[col.dataIndex]
          return arr
        })()
      }
    })
  ]
}

export default {
  name: 'performanceChat',
  props: {
    chartDatas: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      infos: []
    }
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
      const getTotal = () => {
        let total = 0
        const list = []
        columns.forEach(col => {
          list.push(total)
          total += Number(this.chartDatas[col.dataIndex]) || 0
        })

        return list
      }

      const getSeries = () => {
        return columns.map((col, index) => {
          const currentValue = () => {
            const arr = Array(columns.length).fill(0)
            arr[index] = this.chartDatas[col.dataIndex]
            return arr
          }
          return {
            name: col.title,
            type: 'bar',
            stack: '总量',
            data: currentValue()
          }
        })
      }

      const option = {
        ...optionBase,
        series: [
          {
            name: '总时间',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            },
            emphasis: {
              itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: getTotal()
          },
          ...getSeries()
        ]
      }
      this.myChart.setOption(option)
      const infos = columns.map(({ title, dataIndex }) => {
        return {
          title,
          dataIndex,
          value: Math.round(this.chartDatas[dataIndex]) || 0
        }
      })
      this.infos = infos
    }
  }
}
</script>

<style scoped lang="less">
.chat-wrap {
  width: 100%;
  height: 100%;

  .info-wrap {
    display: flex;
    align-content: center;
    justify-content: space-between;

    .info-item {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 300;

      & > div:last-child {
        text-align: center;
        color: #66707a;
        margin-top: 5px;
        .value {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          margin-right: 2px;
        }
      }
    }
  }
  .chat {
    margin-top: 20px;
    width: 100%;
    height: 100%;
  }
}
</style>
