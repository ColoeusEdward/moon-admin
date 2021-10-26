import { isLongPress } from '@/utils'
import { NUpload, NUploadTrigger, } from 'naive-ui'
import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
import style from './index.module.scss'
import useSubmit from './useSubmit'

interface Props {
  curClickBtnI: Ref<string>
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
const { submit } = useSubmit()
const progObj: any = reactive({})
// let upLoadData
const handleUploadUdpate = (list, item) => {
  submit(list, item, progObj)
}
const handleUpload = (handleClick) => {
  handleClick()
}
const renderProgress = (curClickBtnI, item) => {
  let res = curClickBtnI.value == item.i ? <uploadProgress prog={progObj[item.i] || 0} /> : ''
  return res
}
const renderTriggerContent = (handleClick, item, curClickBtnI) => {
  return (<div class={style.upload} onMouseup={() => { !isLongPress() && handleUpload(handleClick) }}>
    {renderProgress(curClickBtnI, item)}
    <iconLink item={item} />
  </div>)
}

// methods----------------------------------------------------------------------------------------------

const gridUploader: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <NUpload defaultUpload={false} abstract action="2" headers={{ 'naive-info': 'hello!' }} onUpdate:file-list={(list) => { handleUploadUdpate(list, props.item) }}>
        <NUploadTrigger v-slots={{ default: ({ handleClick }) => renderTriggerContent(handleClick, props.item, props.curClickBtnI) }} abstract>
        </NUploadTrigger>
      </NUpload>
    )
  }
export default (() => gridUploader)(); //只有这样才能正常使用defineAsyncComponent挂载

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
