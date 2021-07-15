import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

// 把views文件夹下的所有vue文件自动生成映射关系
const modules = import.meta.glob('../views/**/**.vue')
const components: { [key: string]: Component } = {}

Object.keys(modules).forEach((key: string) => {
  const nameMatch: string[] | null = key.match(/^\.\.\/views\/(.+)\.vue/)

  if (!nameMatch) {
    return
  }
  // 如果页面以Index命名，则使用父文件夹作为name
  const indexMatch: string[] | null = nameMatch[1].match(/(.*)\/Index$/i)

  let name: string = indexMatch ? indexMatch[1] : nameMatch[1]

  ;[name] = name.split('/').splice(-1)
  components[name] = modules[key]
})

/**
 * 在主框架内显示
 */
const frameIn: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'home' },
    component: () => import('@/layouts/header/index.vue'),
    children: [
      // 首页
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          auth: true
        },
        component: components['home']
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        component: () => import('../views/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        component: () => import('../views/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut: RouteRecordRaw[] = [
  // 登录
  {
    path: '/Login',
    name: 'login',
    component: components['login']
  }
]

/**
 * 错误页面
 */
const errorPage: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: components['404']
  }
]

const routes: RouteRecordRaw[] = [...frameIn, ...frameOut, ...errorPage]

// 重新组织后导出
export default routes
