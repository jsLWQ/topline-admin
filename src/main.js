import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.interceptors.request.use(config => {
  const token = JSON.parse(window.localStorage.getItem('user-info')).token
  // console.log(token)
  // console.log(config)//本次请求的相关配置
  if (config.url !== '/login') {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  // console.log(response)
  return response.data.data
}, error => {
  return Promise.reject(error)
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
