<template>
  <div>
    <div v-if="item.type === 'click'">
      <div class="title">
        <span>路由：</span> {{ item.simpleUrl }}
      </div>
      <div class="title">
        <span>点击目标class：</span> {{ item.className }}
      </div>
      <div class="title">
        <span>内容：</span> {{ item.innerText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error-breadcrumbs',
  props: {
    item: Object
  },
  methods: {
    /**
     * 转义html标签。 否则vue无法展示
     * @param sHtml string
     */
    html2Escape (sHtml) {
      if (typeof sHtml !== 'string') {
        return sHtml
      }
      return sHtml.replace(/[<>&"]/g, function (c) {
        return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]
      })
    }
  }
}
</script>

<style scoped lang="scss">

.ml-20 {
  margin-left: 20px;
}

.title {
  > span:first-child {
    font-weight: normal;
  }
}
</style>
