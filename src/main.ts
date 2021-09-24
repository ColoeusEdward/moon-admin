import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import components from './components'
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import VueGridLayout from 'vue-grid-layout'
import CScrollbar from 'c-scrollbar';

console.log('components', components)

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueGridLayout)
app.use(CScrollbar)

//注册全局组件
for (const key in components) {
  app.component(key, defineAsyncComponent(components[key]))
}

app.mount('#app')
