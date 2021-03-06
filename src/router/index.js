import Vue from 'vue'
import Router from 'vue-router'
//  加载nprogress进度条
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        { // 主页
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        { // 文章列表
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        { // 发布文章
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        { // 编辑文章
          name: 'publishEdit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        },
        {
          name: 'comment',
          path: '/comment',
          component: () => import('@/views/comment')
        },
        {
          name: 'account',
          path: '/account',
          component: () => import('@/views/account')
        },
        {
          name: 'image',
          path: '/image/list',
          component: () => import('@/views/image')
        }
      ]
    },
    { // 登录
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const userInfo = window.localStorage.getItem('user-info')
  //  判断如果不是登录页，则检查本地存储中是否有user-info，然后取反，没有值则进入，去跳转到登录页，有则next()
  //  如果是登录页，也检查本地存储是否有user-info，有则不让其进入登录页，没有才让进入
  if (to.name !== 'login') {
    if (!userInfo) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    if (userInfo) {
      next(false)
    } else {
      next()
    }
  }
})
router.afterEach((to, form) => {
  NProgress.done()
})
export default router
