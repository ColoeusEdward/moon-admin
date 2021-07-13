import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/moon-admin/' : '/'),
  routes
})

export default router
