import { isLongPress } from '@/utils'
import { NUpload, NUploadTrigger, UploadFileInfo, } from 'naive-ui'
import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
import useWaveProgress from '../waveProgress'
import style from './index.module.scss'
import useSubmit from './useSubmit'
const {waveProgress} = useWaveProgress()
interface Props {
  curClickBtnI: Ref<string>
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
const uploadRef:any = ref()
const { submit } = useSubmit(uploadRef)
const progObj: any = reactive({})
const fileList = ref<Array<UploadFileInfo>>([])

// let upLoadData
const handleUploadUdpate = (list, item) => {
  submit(list, item, progObj)
}
const handleUpload = (handleClick) => {
  handleClick()
}
const renderProgress = (curClickBtnI, item) => {
  // return <waveProgress prog={0} />
  let res = curClickBtnI.value == item.i ? <waveProgress prog={progObj[item.i] || 0} /> : ''
  return res
}
const renderTriggerContent = (handleClick, item, curClickBtnI) => {
  return (<div class={style.upload} onMouseup={() => { !isLongPress() && handleUpload(handleClick) }}>
    {renderProgress(curClickBtnI, item)}
    <iconLink item={item} />
  </div>)
}

// methods----------------------------------------------------------------------------------------------
const mount = () => {
  console.log(`uploadref`,uploadRef.value);
}

const gridUploader: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <NUpload  ref={(e) => {uploadRef.value=e}} defaultUpload={false} abstract action="2" headers={{ 'naive-info': 'hello!' }} fileList={fileList.value} onUpdate:file-list={(list) => { handleUploadUdpate(list, props.item) }}>
        <NUploadTrigger v-slots={{ default: ({ handleClick }) => renderTriggerContent(handleClick, props.item, props.curClickBtnI) }} abstract>
        </NUploadTrigger>
      </NUpload>
    )
  }
export default (() => gridUploader)(); //??????????????????????????????defineAsyncComponent??????

const mounted = async () => {
  // console.timeEnd('????????????')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
