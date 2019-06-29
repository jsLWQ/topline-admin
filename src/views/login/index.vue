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
                  <el-button @click="yzm"  :loading="!!id||authCodeLoading">{{id?`${num}秒后重新发送` : '获取验证码'}}</el-button>
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
import '@/vendor/gt.js'
export default {
  name: 'AppLogin',
  data () {
    return {
      formData: {
        mobile: '17686506616',
        code: '246810',
        checked: ''
      },
      num: 5, //  倒计时时间
      id: '', //  倒计时的id值
      //  禁用登录按钮
      loading: false,
      captchaObj: null,
      lastCellphone: '', //  用来存储上一次的手机号
      authCodeLoading: false, //  用来禁用发送按钮的
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
      //  点击获取验证码时，表单验证
      this.$refs['ruleForm'].validateField('mobile', errorMessage => {
        // errorMessage获取到的是表单验证里面message里的字段，如果通过验证，则errorMessage为空
        if (errorMessage.trim().length > 0) {
          return
        }
        //  如果没有this.captchaObj，则去初始化，有了则去判断两次手机号是否一样，一样的话，则直接
        //  去掉用this.captchaObj.verify()，直接显示，不一样则需要去初始化，还需要上次上一次
        //  初始化插入DOM中的元素
        if (this.captchaObj) {
          if (this.lastCellphone !== this.formData.mobile) {
            document.querySelector('body').removeChild(document.querySelector('.geetest_panel'))
            this.renj()
          } else {
            this.captchaObj.verify()
          }
        } else {
          this.renj()
        }
      })
    },
    //  获得人机交互的验证，然后发送短信验证码
    renj () {
      this.authCodeLoading = true
      this.$axios({
        url: `/captchas/${this.formData.mobile}`,
        method: 'get'
      }).then(data => {
        console.log(1)
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, (captchaObj) => {
          // captchaObj.appendTo('#ma')
          // console.log(captchaObj)
          this.captchaObj = captchaObj
          captchaObj.onReady(() => {
            captchaObj.verify()
            // console.log(this.formData.mobile)
            this.lastCellphone = this.formData.mobile
            this.authCodeLoading = false
          }).onSuccess(() => {
            // console.log(captchaObj.getValidate())
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate
            } = captchaObj.getValidate()
            this.$axios({
              method: 'get',
              url: `/sms/codes/${this.formData.mobile}`,
              params: {
                challenge,
                seccode,
                validate
              }
            }).then(() => {
              this.$message({
                message: '发送验证码成功',
                type: 'success'
              })
              // console.log(res)
              this.countDown()
            })
          })
        })
      })
    },
    //  倒计时效果
    countDown () {
      this.id = window.setInterval(() => {
        this.num--
        if (this.num < 0) {
          window.clearInterval(this.id)
          this.id = ''
          this.num = 5
        }
      }, 1000)
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
      this.$axios({
        method: 'post',
        url: `/authorizations`,
        data: this.formData
      }).then(data => {
        window.localStorage.setItem('user-info', JSON.stringify(data))
        this.$message({
          message: '恭喜你，登录成功',
          type: 'success'
        })
        // console.log(res)
        this.$store.state.user = data
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
