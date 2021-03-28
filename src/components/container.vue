<template>
  <el-container class="container">
    <el-aside width="200px">
      <div class="logo">猫头鹰</div>
      <el-menu
        class="menu"
        router
        default-active="2"
      >
        <el-menu-item
          v-for="page in pageList"
          :key="page.path"
          :index="page.path"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ page.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="container-header">
        <el-avatar shape="square" :src="url"></el-avatar>
      </el-header>
      <el-divider class="divider"></el-divider>
      <el-main class="page-main">
        <keep-alive include="logs">
          <slot></slot>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'container',
  data () {
    return {
      pageList: [
        {
          path: '/project',
          name: '项目列表'
        },
        {
          path: '/logs',
          name: '错误日志'
        },
        {
          path: '/performance',
          name: '页面性能'
        },
        {
          path: '/device',
          name: '终端分部'
        }
      ],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

    }
  }
}
</script>

<style scoped lang="less">
  .container {
    height: 100%;
  }
  .menu {
    height: calc(100% - 64px);
  }

  .logo {
    width: 100%;
    height: 64px;
    background-color: rebeccapurple;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .divider {
    margin: 0;
  }

  .container-header {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #fff;
  }

  .page-main {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
  }
</style>
