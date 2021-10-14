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

  window.$socket = socket
}