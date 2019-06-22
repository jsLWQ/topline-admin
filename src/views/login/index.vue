<template>
    <div class="form">
        <div class="dan">
            <el-form ref="form" :model="formData">
            <el-form-item>
                <el-input v-model="formData.mobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-col :span="10">
                    <el-input v-model="formData.code" placeholder="验证码"></el-input>
                </el-col>
                <el-col :span="10"  :offset="2">
                    <el-button>获取验证码</el-button>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn-login" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
export default {
  name: 'AppLogin',
  data () {
    return {
      formData: {
        mobile: '17686506616',
        code: ''
      }
    }
  },

  methods: {
    onSubmit () {
      console.log('msg')
    }
  }
}
</script>
<style lang="less" scoped>
  .form {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .dan {
        padding: 70px;
        background: #fff url('./logo_index.png')no-repeat top 15px center;
        background-size: 200px;
        .btn-login {
            width: 100%;
        }
    }
  }
</style>
