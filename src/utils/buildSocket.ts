declare global {
  interface Window {
    $socket?: any
  }
}
import { useSocketStore } from "@/store/modules/socket"

export function buildSocket(socket){
  let socketStore = useSocketStore()
  socket.on('getMem',(res) => {
    socketStore.memPercent = res
  })
  // socket.io.on("reconnect", (attempt) => {
  //   console.log(`reconnect触发`,);
  //   socket.emit('getMem')
  // });
  socket.on("connect", () => {
    console.log(`connect触发`,);
    socket.emit('getMem')
  });

  window.$socket = socket
}