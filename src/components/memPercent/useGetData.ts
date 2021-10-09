import { memPercent } from '@/apis/index'


export default function useGetData(option) {
  const getMemData = async () => {
    let res = await memPercent()
    option.series[0].data[0].value = res[0]
    option.series[0].data[1].value = res[1]
  }
  return {
    getMemData
  }
}