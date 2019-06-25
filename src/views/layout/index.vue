<template>
    <el-container>
      <el-aside width="200px">
        <AppAside></AppAside>
      </el-aside>
      <el-container>
        <el-header>
          <AppHeader></AppHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script>
import AppHeader from './components/AppHeader'
import AppAside from './components/AppAside'
export default {
  components: {
    AppHeader,
    AppAside
  }
}
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;
    line-height: 200px;
  }
  .el-menu-item:hover {
    background-color: blue
  }
}
.el-main {
  background: #ccc;
}
.el-header {
  line-height: 60px;
}
</style>
