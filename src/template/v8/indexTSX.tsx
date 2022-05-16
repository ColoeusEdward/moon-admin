import { ref, FunctionalComponent, reactive, watch, Ref, computed } from 'vue'
import style from './index.module.scss'
import { GridLayout } from 'vue3-grid-layout'
interface Props {
  prog?: number,
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}

const useIndexTSX = () => {


  const mount = (el) => {

  }
  const IndexTSX: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit } = ctx
      console.log("🚀 ~ file: useMySkeleton.tsx ~ line 50 ~ useMySkeleton ~ ctx.slots", ctx.slots)
      // let sty = JSON.parse(JSON.stringify(style))
      // Object.assign(sty, props.style)
      // let styleFather = Object.values({fdfa:'fff'})[0]
      return (
        <div class={'w-full h-full'} v-watchSize={(el) => { mount(el) }}>
          
        </div>
      )
    }
  return {
    IndexTSX
  }
}

export default useIndexTSX