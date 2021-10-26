import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
import style from './index.module.scss'

interface Props {
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}

const renderComp = (item) => {
  let res = ''
  let compObj = {
    'memPercent':<memPercent />
    ,'timeCounter':<timeCounter />
  }
  compObj[item.comp] && (res = compObj[item.comp])
  return res
}
// methods----------------------------------------------------------------------------------------------

const chartCon: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <div class={style.chart}>
        {renderComp(props.item)}
      </div>
    )
  }
export default (() => chartCon)(); //只有这样才能正常使用defineAsyncComponent挂载

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
