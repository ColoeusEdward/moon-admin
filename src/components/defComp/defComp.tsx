import { ref, FunctionalComponent, reactive, Ref, onMounted, defineComponent, PropType } from 'vue'
import style from './index.module.scss'
import { copyToPaste, isLongPress } from '@/utils';
import { NInput, NButton, NSpin, NIcon, NModal, FormRules, NScrollbar } from 'naive-ui';
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
const defComp = defineComponent({
  props: {
    curClickBtnI: {
      type: Object as PropType<Ref<string>>,
      default: undefined,
    },
    item: {
      type: Object as PropType<gridItem>,
      default: undefined,
    },
  },
  name: 'testDefComp',
  setup(props, ctx) {
    onMounted(() => {
      console.log(`test Def`,);
    })
    const dd = reactive({})
    return () => (
      <div>
        fuck
      </div>
    )
  }
})
export {
  defComp
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
  const mount = (el) => {

  }


  const accountList: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit, attrs } = ctx
      Object.assign(sty, props.style)
      // let item = props.item
      data.props = props
      // console.log(`props item`, props.item);

      return (
        <NSpin class={sty.con} show={data.spinShow}>
          <div class={sty.con} v-getComp={(el) => { mount(el) }} >

          </div>
        </NSpin>
      )
    }
  // export default (() => gridInput)(); //只有这样才能正常使用defineAsyncComponent挂载
  return {
    accountList
  }
}


