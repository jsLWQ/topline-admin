<template>
  <div>
    <el-menu
      default-active="2"
      @open="handleOpen"
      @close="handleClose"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="iconfont icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-neirongguanli"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/publish">发布文章</el-menu-item>
          <el-menu-item index="/article">内容列表</el-menu-item>
          <el-menu-item index="/comment">评论列表</el-menu-item>
          <el-menu-item index="/image/list">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-fensi"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">图文数据</el-menu-item>
          <el-menu-item index="2-2">粉丝概况</el-menu-item>
          <el-menu-item index="2-3">粉丝画像</el-menu-item>
          <el-menu-item index="2-4">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/account">
        <i class="iconfont icon-icon-"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      // console.log (key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
.el-menu {
  height: 100%;
  .el-menu-item {
    background: rgb( 50, 55, 69 );
    .el-menu-item:hover {
      background: rgb(64, 158, 255)!important
    }
  }
}
.iconfont {
  margin-right: 7px;
}
</style>
