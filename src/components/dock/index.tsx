import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
import style from './index.module.scss'
import useData from './useData'

interface Props {
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
}
type Emit = {
  needRecover: () => void;
}

const dock: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)
    const data = useData(emit)
    const renderItem = () => {
      return data.list.map(e => {
        return (
          <div class={style.item}>
            <iconLink clickFn={e.fn} style={style} item={e} />
          </div>
        )
      })
    }
    
    return (
      <div class={style.dock}>
        {renderItem()}
      </div>
    )
  }
export default (() => dock)(); //只有这样才能正常使用defineAsyncComponent挂载

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
