declare global {
  interface Window {
    $socket?: any
  }
}
import { useSocketStore } from "@/store/modules/socket"

export function buildSocket(socket){
  let socketStore = useSocketStore()
  socket.on('getMem',(res) => {
    socketStore.setMemPercent(res)
  })
  // socket.io.on("reconnect", (attempt) => {
  //   console.log(`reconnect触发`,);
  //   socket.emit('getMem')
  // });
  socket.on("connect", () => {
    socket.emit('getMem')
  });

  window.$socket = socket
}