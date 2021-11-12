import { ref, FunctionalComponent, reactive, Ref } from 'vue'
import style from './index.module.scss'
import { isLongPress } from '@/utils';
import { NInput, NButton, NSpin } from 'naive-ui';
import useSubmit from './useSubmit';
interface Props {
  // submitFn: (input: string, target: string) => void
  curClickBtnI: Ref<string>
  item: gridItem
  h: number
  prog?: number
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
type reacData = {
  props?:Props
}
export default function useGridInput() {
  const data:reacData = reactive({})
  const { submitObj } = useSubmit()
  const inputContent = ref('')
  const targetInputContent = ref('')
  const spinShow = ref(false)
  const targetInputList = ['自由上传文件']
  const handleInputBtn = async (item) => {
    submitObj[item.text] && (spinShow.value = true) && await submitObj[item.text](inputContent.value, targetInputContent.value)
    spinShow.value = false
  }
  const renderIconLink = (item) => {
    return item.expend ? '' : (<iconLink item={item} />)
  }
  const renderTargetInput = (item) => {
    return targetInputList.indexOf(item.text) != -1 ? (<NInput style="margin-bottom:10px;" v-model:value={targetInputContent.value} placeholder="上传地址" clearable />) : ''
  }
  const renderbody = (item) => {
    let text = item.expend ? (<div style="color:#fff;width:100%;margin-bottom:6px;">{item.text}</div>) : ''
    let body = item.expend ? (<div onMouseup={(e) => { e.stopPropagation() }}>
      <NInput style="font-size:16px;margin-bottom:10px;" v-model:value={inputContent.value} type="textarea" placeholder="多项用回车分割" clearable />
      {renderTargetInput(item)}
      <NButton style="width:90%;height:40px;" type="primary" onClick={() => !isLongPress() && handleInputBtn(item)}>提交</NButton>
    </div>) : ''
    let res = [text, body]
    return res
  }
  // methods----------------------------------------------------------------------------------------------

  const gridInput: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit,attrs } = ctx
      Object.assign(style, props.style)
      // let item = props.item
      data.props = props

      return (
        <NSpin show={(spinShow.value && props.curClickBtnI.value == props.item.i)}>
          <div class={style.input}>
            {renderIconLink(props.item)}
            {renderbody(props.item)}
          </div>
        </NSpin>
      )
    }
  // export default (() => gridInput)(); //只有这样才能正常使用defineAsyncComponent挂载

  const mounted = async () => {
    // console.timeEnd('挂载时间')
    // await sleep(50)
    // vch.value?.resize()

    // console.log(`vch`,);
  }

  return {
    gridInput
  }
}


