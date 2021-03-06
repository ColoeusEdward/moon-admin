import { createRouter, createWebHistory,createWebHashHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import routes from './routes'
import define from '@/utils/define'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? define.root : '/'),
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  // 进度条
  NProgress.start()
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r: RouteRecordNormalized) => r.meta.auth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    const token = localStorage.getItem('token')
    if (token && token !== 'undefined') {
      next()
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach(() => {
  // 进度条
  NProgress.done()
})

export default router
