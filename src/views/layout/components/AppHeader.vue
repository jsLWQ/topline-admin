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
            <el-dropdown-item @click.native="dropOut ">退出</el-dropdown-item>
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
  },
  methods: {
    //  退出登录
    dropOut () {
      // console.log(1)
      this.$confirm('此操作将退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出登录成功!'
        })
        window.localStorage.removeItem('user-info')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
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
