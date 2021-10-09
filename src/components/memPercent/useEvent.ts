import { memPercent } from '@/apis/index'


export default function useEvent() {
  const handleClick = async (fn) => {
    fn()
  }
  return {
    handleClick
  }
}