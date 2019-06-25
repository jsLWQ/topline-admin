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
//  注释自己写的
// if(location.hash.split('#')[1].toString()!=='/login') {
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.localStorage.getItem('user-info'))
  // console.log(token)
  // console.log(config)//本次请求的相关配置
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  // if (config.url !== '/login') {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config
}, error => {
  return Promise.reject(error)
})
// }

// console.log(location.hash.split('#')[1].toString())
// if(location.hash.split('#')[1].toString()!=='/login') {
axios.interceptors.response.use(response => {
// console.log(response)
  return response.data.data
}, error => {
// console.dir(error)
// console.log(error.response.status)
// console.log(response.url)
  if (error.response.status === 401) {
    window.localStorage.removeItem('user-info')
    router.push('/login')
  }
  return Promise.reject(error)
})
// }

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
