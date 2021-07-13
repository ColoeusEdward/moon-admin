import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: '用户登录',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: '首页',
    component: () => import('../views/home/index.vue')
  }
]

export default routes
