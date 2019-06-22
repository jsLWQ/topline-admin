<template>
    <div class="form">
        <div id="dan">
            <el-form ref="form" :model="formData">
            <el-form-item>
                <el-input v-model="formData.mobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item id="ma">
                <el-col :span="10">
                    <el-input v-model="formData.code" placeholder="验证码"></el-input>
                </el-col>
                <el-col :span="10"  :offset="2">
                    <el-button @click="yzm">获取验证码</el-button>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn-login" @click="handleLogin">登录</el-button>
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
        code: ''
      },
      captchaObj: null
    }
  },

  methods: {
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
          product: 'prpup'
        }, (captchaObj) => {
          captchaObj.appendTo('#ma')
          console.log(captchaObj)
          this.captchaObj = captchaObj
          captchaObj.onReady(() => {
            captchaObj.verify()
          }).onSuccess(() => {
            console.log(1)
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
            }).then(res => {
              console.log(res)
            })
          })
        })
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
