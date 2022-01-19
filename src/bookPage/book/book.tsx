import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
// import style from './index.module.scss'
import { useToolTip } from '@/utils/comp';
import { isLongPress, numToChinese, sleep } from '@/utils';

interface Props {
  
}
type Emit = {
  childClick: () => void;
}
const useBook = () => {
  const toolTip = useToolTip()
  const resData: any = ref(null)

  // methods----------------------------------------------------------------------------------------------


  const mount = () => {

  }
  const Book: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit } = ctx
      // let sty = JSON.parse(JSON.stringify(style))
      // Object.assign(sty, props.style)
      // let styleFather = Object.values({fdfa:'fff'})[0]
      return (
        <div class={'flex w-full h-full justify-center items-center bg-orange-200'} v-getComp={(el) => { mount() }} onMouseup={() => { !isLongPress() }}>
          fuck you
        </div>
      )
    }
  return {
    Book
  }
}

export default useBook;
