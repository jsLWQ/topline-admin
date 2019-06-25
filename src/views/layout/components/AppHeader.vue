<template>
  <div>
    <el-row class="app-header">
      <el-col :span="20">
        <div>江苏传智播客教育科技股份有限公司</div>
      </el-col>
      <el-col  :span="4" :offset="6">
        <img width="30" :src="userInfo.photo" alt="">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: ''
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user-info'))
    // console.log(this.userInfo)
  }
}
</script>
<style lang="less" scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
}
.el-dropdown-link {
  // display: flex;
  align-items: center;
  cursor: pointer;
  color: #409EFF;
}
img {
  vertical-align: middle;
  border-radius: 50%;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
