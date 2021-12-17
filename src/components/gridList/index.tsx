import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
import style from './index.module.scss'
import { CScrollbar } from 'c-scrollbar'
import useRenderListRow from './useRenderListRow'
import useApiReq from './useApiReq'
import { isLongPress } from '@/utils'
import { NSpin, NScrollbar } from 'naive-ui'

// const CScrollbar = new CScrollbarClass()
interface Props {
  curClickBtnI: Ref<string>
  w: number
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}

const renderListRow = useRenderListRow()
const { reqObj } = useApiReq()
const spinShow = ref(false)
const sendReq = async (item) => {
  reqObj[item.text] && (spinShow.value = true) && (item.list = await reqObj[item.text]())
  spinShow.value = false
}
const renderIconLink = (item) => {
  return !item.list ? <iconLink item={item} /> : ''
}
const renderTitle = (item) => {
  return item.list ? <div style="color:#f5f5d5;width:100%;margin-bottom:10px;border-bottom:1px solid #fff;">{item.text}</div> : ''
}
const renderScrollList = (item) => {
  let res: JSX.Element | string = ''
  if (item.list) {
    // res = (
    //   // @ts-ignore
    //   <CScrollbar width="100%" height="640px" direction="y">
    //     {renderListRow.render(item)}
    //   </CScrollbar>
    // )
    res = (
      <NScrollbar style="width:100%;height:640px">
        {renderListRow.render(item)}
      </NScrollbar>
      // <CScrollbar width="100%" height="640px" direction="y">

      // </CScrollbar>
    )
  }
  return res
}
const gridList: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <NSpin class={style.listCon} show={spinShow.value && props.curClickBtnI.value == props.item.i}>
        <div class={style.list} onMouseup={() => { !isLongPress() && sendReq(props.item); }}>
          {renderIconLink(props.item)}
          {renderTitle(props.item)}
          {renderScrollList(props.item)}
        </div >
      </NSpin>
    )
  }
export default (() => gridList)(); //只有这样才能正常使用defineAsyncComponent挂载

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
