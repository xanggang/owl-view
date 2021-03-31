<template>
  <div class="nodata-wrap">
    <img src="../assets/nodata.jpg" alt="">
    <div class="text">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: 'nodata'
}
</script>

<style scoped lang="less">

.nodata-wrap {
  width: 310px;
  height: 190px;

  .text {
    text-align: center;
    margin-top: 10px;
    color: #606266;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
