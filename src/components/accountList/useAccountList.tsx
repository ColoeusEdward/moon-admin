import { ref, FunctionalComponent, reactive, Ref } from 'vue'
import style from './index.module.scss'
import { copyToPaste, isLongPress } from '@/utils';
import { NInput, NButton, NSpin, NIcon, NModal, FormRules, NScrollbar } from 'naive-ui';
import useSubmit from './useSubmit';
import { getAccountList, saveAccountList } from '@/apis';
import { ContentCopyFilled } from '@vicons/material';
import useMyFormWarp from '../myFormWarp/useMyFormWarp';
import { AccData } from '../../apis/BasicResponseModel'
import { Delete24Regular } from '@vicons/fluent'
import { useThemeStore } from '@/store/modules/theme';
interface Props {
  // submitFn: (input: string, target: string) => void
  curClickBtnI: Ref<string>
  item: gridItem
  h: number
  prog?: number
  style?: CSSModuleClasses
}
// interface AccData {
//   acc: string
//   , psw: string
// }
type Emit = {
  childClick: () => void;
}
type ReacData = {
  props?: Props
  spinShow: boolean
  accData?: AccData[]
  modalShow: boolean
  // , form?: AccData
}
export default function useAccountList() {
  const sty = JSON.parse(JSON.stringify(style))
  const data: any = reactive({
    spinShow: false
    , modalShow: false
  })
  const themeStore = useThemeStore()
  const form: AccData = reactive({ acc: '', psw: '' })
  const rule = {
    must: { required: true, message: '请输入该项', trigger: 'blur' },
  }
  const formItemList = reactive([
    { type: 'input', label: 'a', prop: 'acc' }
    , { type: 'input', label: 'p', prop: 'psw' }
  ])
  const { myFormWarp, spinShow: formSpin } = useMyFormWarp()
  // methods----------------------------------------------------------------------------------------------
  const getAccount = async () => {
    data.spinShow = true
    let res = await getAccountList()
    data.accData = JSON.parse(res)
    data.spinShow = false
  }
  const handleAdd = (item) => {
    data.modalShow = true
  }
  const handleSaved = async () => {
    !data.accData && (data.accData = [])
    data.accData.push(form)
    formSpin.value = true
    await saveAccountList(data.accData)
    formSpin.value = false
    data.modalShow = false
  }
  const handleDelete = (index) => {
    const del = async () => {
      data.accData.splice(index, 1)
      await saveAccountList(data.accData)
    }
    themeStore.dialog!.warning({
      title: '警告',
      content: '你确定？',
      positiveText: `🤗🤗🤗`,
      negativeText: '呀哒',
      onPositiveClick: () => {
        del()
      },
      onNegativeClick: () => {

      }
    })
  }
  const renderIconLink = (item) => {
    return item.expend ? '' : (<iconLink item={item} />)
  }
  const renderAccountList = () => {
    if (data.accData) {
      return data.accData.map((e, i) => {
        return (
          <div class={sty.row}>
            <div onMouseup={() => !isLongPress() && copyToPaste(e.acc)}>
              {e.acc}
              <NIcon size="30">
                <ContentCopyFilled />
              </NIcon>
            </div>
            <div style={{ marginLeft: '5px' }} onMouseup={() => !isLongPress() && copyToPaste(e.psw)}>
              {e.psw}
              <NIcon size="30">
                <ContentCopyFilled />
              </NIcon>
            </div>
            <NButton style="height:40px;color:#fff;margin:0 5px;" type="error" onClick={() => !isLongPress() && handleDelete(i)}
              v-slots={{
                icon: () => {
                  return (<NIcon><Delete24Regular /></NIcon>)
                }
              }}></NButton>
          </div>
        )
      })
    }
  }
  const renderBody = (item) => {
    let text = item.expend ? (<div style="color:#fff;width:100%;margin-bottom:6px;">账号</div>) : ''
    let body = item.expend ? (
      <NScrollbar style="width:100%;height:640px"  >
        <div onMouseup={(e) => { e.stopPropagation() }}>
          {renderAccountList()}
          <NButton style="width:90%;height:40px;" type="primary" onClick={() => !isLongPress() && handleAdd(item)}>+</NButton>
        </div>
      </NScrollbar>) : ''
    let res = [text, body]
    return res
  }
  const renderDialog = () => {
    return (
      <NModal v-model:show={data.modalShow} preset="card" title="保存ap" style={{ width: '500px' }} v-slots={{
        action: scope => {
          return (
            <div style={{ display: 'flex' }}><NButton style="width:80%;height:40px;margin:auto;" type="primary" onClick={() => handleSaved()}>保存</NButton></div>
          )
        }
      }}>
        <myFormWarp form={form} rule={rule} itemList={formItemList} />
      </NModal>

    )

  }
  const mount = (el) => {

  }

  const accountList: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit, attrs } = ctx
      Object.assign(sty, props.style)
      // let item = props.item
      data.props = props
      console.log(`props item`, props.item);
      return (
        <NSpin class={sty.con} show={data.spinShow}>
          <div class={sty.con} v-getComp={(el) => { mount(el) }} onMouseup={() => !isLongPress() && getAccount()}>
            {renderIconLink(props.item)}
            {renderBody(props.item)}
            {renderDialog()}
          </div>
        </NSpin>
      )
    }
  // export default (() => gridInput)(); //只有这样才能正常使用defineAsyncComponent挂载
  return {
    accountList
  }
}


