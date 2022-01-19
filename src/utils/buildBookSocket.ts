import { Socket } from 'socket.io-client'
declare global {
  interface Window {
    $socket?: Socket
  }
}
import { useBookStore } from '@/store/modules/book'

export function buildBookSocket(socket: Socket) {
  const bookStore = useBookStore()

  // socket.io.on("reconnect", (attempt) => {
  //   console.log(`reconnect触发`,);
  //   socket.emit('getMem')
  // });
  socket.on("connect", () => {

  });
  socket.on('novelContent', (res) => {
    bookStore.setContent(res)
  })

  window.$socket = socket
}