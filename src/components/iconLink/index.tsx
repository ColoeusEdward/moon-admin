import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
import style from './index.module.scss'
import { useToolTip } from '@/utils/comp';
import { isLongPress } from '@/utils';
import useApiReq from './useApiReq';


interface Props {
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
  clickFn?: () => void
}
type Emit = {
  childClick: () => void;
}
const toolTip = useToolTip()
const { reqObj } = useApiReq()
const contentRender = (item, sty) => {
  return (
    <div class={sty.imgCon}>
      <img class={sty.img} src={item.src} alt={item.text} />
    </div>
  )
}
const goLink = (item) => {
  item.link && window.open(item.link)
  reqObj[item.text] && reqObj[item.text]()
}
// methods----------------------------------------------------------------------------------------------

const iconLink: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    let sty = JSON.parse(JSON.stringify(style))
    Object.assign(sty, props.style)
    // let styleFather = Object.values({fdfa:'fff'})[0]
    return (
      <div class={sty.icon} onMouseup={() => { !isLongPress() && goLink(props.item) }} onClick={() => { props.clickFn && props.clickFn() }}>
        {toolTip.render(contentRender(props.item, sty), props.item.text!)}
      </div>
    )
  }
export default (() => iconLink)(); //只有这样才能正常使用defineAsyncComponent挂载

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
