import { memPercent } from '@/apis/index'
import { sleep } from '@/utils';



export default function useEvent() {
  const handleClick = async (fn) => {
    fn()
  }
  const handleDivResize = () => {
    console.log(`fuckresize`,);
  }

  const checkRef = async (ref) => {
    while (true) {
      await sleep(1000)
      console.log({ ref });
    }
  }
  return {
    handleClick
    , handleDivResize
    , checkRef
  }
}