import { ref, FunctionalComponent, reactive, Ref } from 'vue'
import style from './index.module.scss'
import { isLongPress } from '@/utils';
import { NInput, NButton, NSpin, NScrollbar } from 'naive-ui';
import useSubmit from './useSubmit';
import { useMouse } from '@vueuse/core';
import useMyFormWarp from '../myFormWarp/useMyFormWarp';

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
  props?: Props
}
type formData = {
  url: string
  , list: string
}
export default function useSyncToYou() {
  const data: reacData = reactive({})
  const { submitObj, submit } = useSubmit()
  const { MyFormWarp, spinShow: formSpin } = useMyFormWarp()
  const form: formData | {} = reactive({})
  const rule = {
    must: { required: true, message: '请输入该项', trigger: 'blur' },
  }
  const formItemList = reactive([
    { type: 'input', label: '链接', prop: 'url', width: 23, inputType: 'textarea',row:5 }
    // , { type: 'input', label: 'p', prop: 'psw', width: 24 }
  ])
  const spinShow = ref(false)
  const targetInputList = ['自由上传文件']
  const handleInputBtn = async () => {
    // submitObj[item.text] && (spinShow.value = true) && await submitObj[item.text](inputContent.value, targetInputContent.value)
    submit(formSpin, form)
    // spinShow.value = false
  }
  const renderIconLink = (item) => {
    return item.expend ? '' : (<iconLink item={item} />)
  }
  const renderbody = (item) => {
    let text = item.expend ? (<div style="color:#fff;width:100%;margin:6px 0;">{item.text}</div>) : ''
    let body = item.expend ? (
      <NScrollbar style="width:100%;height:220px;padding:10px;">
        <div onMouseup={(e) => { e.stopPropagation() }}>
          <MyFormWarp rule={rule} form={form} itemList={formItemList} submitFn={() => !isLongPress() && handleInputBtn()} />
          {/* <NButton style="width:90%;height:40px;" type="primary" onClick={() => !isLongPress() && handleInputBtn()}>提交</NButton> */}
        </div>
      </NScrollbar>) : ''
    let res = [text, body]
    return res
  }
  // methods----------------------------------------------------------------------------------------------

  const SyncToYou: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit, attrs } = ctx
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
    SyncToYou
  }
}


