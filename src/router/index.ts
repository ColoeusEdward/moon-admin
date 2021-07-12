import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = []

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/moon-admin/' : '/'),
  routes
})

export default router
