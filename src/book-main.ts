import { createApp, defineAsyncComponent } from 'vue'
import App from './bookApp.vue'
import router from './router/bookRouter'
import { store } from './store'
import components from './components'
import directive from './directive'
import { io,Socket } from "socket.io-client";
import '@/assets/global.scss'
// import './assets/global.scss'

// import resize from ''
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import define from './utils/define'
import './index.css'
import { buildBookSocket } from './utils/buildBookSocket'
// console.log('components', components)
// const socket = io(define.wsUrl,{
//   transports: ["websocket"]
//   // ,reconnectionDelayMax: 10000
//   // ,reconnectionDelay:5000
// });

const socket:Socket = io(define.wsUrl,{
    transports: ["websocket"]
    ,reconnectionDelayMax: 10000
    ,reconnectionDelay:5000
  })


const app = createApp(App)
app.use(store)
app.use(router)


buildBookSocket(socket)

//注册全局组件
for (const key in components) {
  app.component(key, defineAsyncComponent(components[key]))
}

for(const key in directive){
  app.directive(key,directive[key].default)
  console.log(`directive`,directive[key].default);
}

app.mount('#app')

