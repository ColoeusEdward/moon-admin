import { Socket } from 'socket.io-client'
declare global {
  interface Window {
    $socket?: Socket
  }
}
import { useSocketStore } from "@/store/modules/socket"
import { useBookStore } from '@/store/modules/book'

export function buildSocket(socket: Socket) {
  let socketStore = useSocketStore()
  const bookStore = useBookStore()
  socket.on('getMem', (res) => {
    socketStore.setMemPercent(res)
  })
  socket.on('start', (res) => {
    window.$msg?.success(res)
  })
  socket.on('stop', (res) => {
    window.$msg?.success(res)
  })
  socket.on('reset', (res) => {
    window.$msg?.success(res)
  })
  socket.on('getTimeLoop', (res) => {
    if (res.total) {
      socketStore.setTotalTime(res.total)
      socketStore.setTime(res.time)
    } else {
      socketStore.setTime(res)
    }
  })
  // socket.io.on("reconnect", (attempt) => {
  //   console.log(`reconnect触发`,);
  //   socket.emit('getMem')
  // });
  socket.on("connect", () => {
    socket.emit('getMem')
    socket.emit('getTimeWithTotal')
    // socket.emit('getTimeLoop')
  });

  socket.on('YoutubeNeedToken', () => {
    socketStore.setYoutubeNeedToken(true)
  })
  socket.on('novelContent', (res) => {
    bookStore.setContent(res)
  })

  window.$socket = socket
}