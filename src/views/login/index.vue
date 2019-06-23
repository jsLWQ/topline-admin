<template>
    <div class="form">
        <div id="dan">
            <el-form :model="formData" :rules="rules" ref='ruleForm'>
            <el-form-item prop="mobile">
                <el-input v-model="formData.mobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item id="ma" prop="code">
                <el-col :span="10">
                    <el-input v-model="formData.code" placeholder="验证码"></el-input>
                </el-col>
                <el-col :span="10"  :offset="2">
                    <el-button @click="yzm" :disabled="dis">{{ma}}</el-button>
                </el-col>
            </el-form-item>
            <el-form-item prop="checked">
              <el-checkbox v-model="formData.checked">
                  我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a>
                </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" class="btn-login" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import '@/vendor/gt.js'
export default {
  name: 'AppLogin',
  data () {
    return {
      formData: {
        mobile: '17686506616',
        code: '',
        checked: ''
      },
      ma: '获取验证码',
      num: 5,
      id: '',
      //  禁用登录按钮
      loading: false,
      captchaObj: null,
      //  禁用发送按钮
      dis: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度在 11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度在 6位', trigger: 'blur' }
        ],
        checked: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
          { pattern: /true/, message: '请同意用户协议', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    //  发送验证码时
    yzm () {
      if (this.captchaObj) {
        return this.captchaObj.verify()
      }
      axios({
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${this.formData.mobile}`,
        method: 'get'
      }).then(res => {
        window.initGeetest({
          gt: res.data.data.gt,
          challenge: res.data.data.challenge,
          offline: !res.data.data.success,
          new_captcha: res.data.data.new_captcha,
          product: 'bind'
        }, (captchaObj) => {
          captchaObj.appendTo('#ma')
          console.log(captchaObj)
          this.captchaObj = captchaObj
          captchaObj.onReady(() => {
            captchaObj.verify()
          }).onSuccess(() => {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate
            } = captchaObj.getValidate()
            axios({
              method: 'get',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${this.formData.mobile}`,
              params: {
                challenge,
                seccode,
                validate
              }
            })
          })
        })
      })
    },
    //  点击登录时
    handleLogin () {
      this.$refs['ruleForm'].validate(valid => {
        if (!valid) {
          return
        }
        this.ax()
        this.loading = true
      })
    },
    ax () {
      axios({
        method: 'post',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/authorizations`,
        data: this.formData
      }).then(res => {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
        this.$router.push({ name: 'home' })
        this.loading = false
      }).catch(err => {
        this.$message.error('验证码错误')
        console.log(err)
        this.loading = false
      })
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
      background: url('./login_bg.jpg');
    #dan {
        padding: 70px;
        background: #fff url('./logo_index.png')no-repeat top 15px center;
        background-size: 200px;
        .btn-login {
            width: 100%;
        }
    }
  }
</style>
