import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import components from './components'
import directive from './directive'
import { io } from "socket.io-client";

// import resize from ''
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import { buildSocket } from './utils/buildSocket'
import define from './utils/define'


// import CScrollbar from 'c-scrollbar';

// console.log('components', components)
// const socket = io(define.wsUrl,{
//   transports: ["websocket"]
//   // ,reconnectionDelayMax: 10000
//   // ,reconnectionDelay:5000
// });

const socket = io(define.wsUrl,{
    transports: ["websocket"]
    ,reconnectionDelayMax: 10000
    ,reconnectionDelay:5000
  })


const app = createApp(App)
app.use(store)
app.use(router)



buildSocket(socket)

//注册全局组件
for (const key in components) {
  app.component(key, defineAsyncComponent(components[key]))
}

for(const key in directive){
  app.directive(key,directive[key].default)
  console.log(`directive`,directive[key].default);
}

app.mount('#app')

