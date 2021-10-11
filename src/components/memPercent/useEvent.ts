import { memPercent } from '@/apis/index'



export default function useEvent() {
  const handleClick = async (fn) => {
    fn()
  }
  const handleDivResize = () => {
    console.log(`fuckresize`,);
  }
  return {
    handleClick
    ,handleDivResize
  }
}