
import { useSocketStore } from '@/store/modules/socket'
const socketStore =  useSocketStore()
// window.$socket.emit('getMem')



export default function useGetData(option) {
  socketStore.$subscribe((mu,state) => {
    getMemData()
  })
  const getMemData = async () => {
    const memData = socketStore.memPercent
    // let res = await memPercent()
    option.series[0].data[0].value = memData[0]
    option.series[0].data[1].value = memData[1]
  }

  return {
    getMemData
  }
}