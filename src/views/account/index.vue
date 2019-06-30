<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="媒体名称">
              <el-input v-model="form.name" placeholder="媒体名称"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介">
              <el-input type="textarea" v-model="form.intro" placeholder="媒体简介"></el-input>
            </el-form-item>
            <el-form-item label="头条ID">
              <el-input v-model="form.id" :disabled="dis"></el-input>
            </el-form-item>
            <el-form-item label="绑定手机">
              <el-input v-model="form.mobile" :disabled="dis"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存更新</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadphoto">
            <img v-if="photo" :src="photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'AppAccount',
  data () {
    return {
      form: {
        name: '',
        intro: '', // 媒体简介
        id: '', //  头条ID
        mobile: '', // 手机号
        email: '' // 邮箱
      },
      dis: true,
      imageUrl: '',
      photo: ''
    }
  },
  created () {
    this.photo = JSON.parse(window.localStorage.getItem('user-info')).photo
    this.userMaterial()
  },
  methods: {
    //  更新用户资料
    onSubmit () {
      this.$axios({
        method: 'PATCH',
        url: `/user/profile`,
        data: this.form
      }).then(data => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        // console.log(data)
        this.$store.commit('userChange', data)
        this.$router.push({ name: 'home' })
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '更新失败',
          type: 'error'
        })
      })
    },
    //  获取用户资料
    userMaterial () {
      this.$axios({
        method: 'GEt',
        url: '/user/profile'
      }).then(data => {
        this.$message({
          message: '获取资料成功',
          type: 'success'
        })
        data.id = data.id.toString()
        // console.log(data.id.toString())
        this.form = data
      }).catch(err => {
        this.$message({
          message: '获取资料失败',
          type: 'error'
        })
        console.log(err)
      })
    },
    // 上传组件
    beforeAvatarUpload () {},
    handleAvatarSuccess () {},
    // 更新头像
    uploadphoto (uploadConfig) {
      // console.log(uploadConfig)
      const formData = new FormData()
      formData.append('photo', uploadConfig.file)
      this.$axios({
        method: 'PATCH',
        url: `/user/photo`,
        data: formData
      }).then(data => {
        // console.log(data)
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$store.commit('userChange', data)
        this.photo = data.photo
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '修改失败',
          type: 'error'
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #000;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader {
  padding-left: 45px
}
</style>
