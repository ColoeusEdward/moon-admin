import { ref, FunctionalComponent, reactive, Ref } from 'vue'
import style from './index.module.scss'
import { isLongPress } from '@/utils';
import { NInput, NButton, NSpin, NForm, FormRules, NGrid, NGi, NFormItem, NSelect } from 'naive-ui';
// import type {NForm} from 'naive-ui'
import useSubmit from './useSubmit';
import { useMouse } from '@vueuse/core';
export interface formListItem {
  type: string
  label: string
  prop: string
  placeholder?: string
  inputType?: string
  row?: number
  width?: number
  rule?: string
}
interface Props {
  // submitFn: (input: string, target: string) => void
  prog?: number
  style?: CSSModuleClasses
  rule?: FormRules
  form: Object
  itemList: formListItem[]
  submitFn?: () => any
  hideBtn?: boolean
  optionMap?: Object
}
type Emit = {
  childClick: () => void;
}
type reacData = {
  props?: Props
}
export default function useMyFormWarp() {
  const data: reacData = reactive({})
  const defaultRule: FormRules = {
    must: { required: true, message: '请输入该项', trigger: 'blur' },
  }
  const spinShow = ref(false)
  const finalRule = ref({})
  const formRef: any = ref({})
  // methods----------------------------------------------------------------------------------------------
  const renderInput = (form, item) => {
    return (
      <NFormItem label={item.label} path={item.prop}>
        <NInput v-model:value={form[item.prop]} placeholder="" clearable type={item.inputType || 'text'} rows={item.row || 3} />
      </NFormItem>
    )
  }
  const renderSelect = (form, item, optionMap) => {
    return (
      <NFormItem label={item.label} path={item.prop}>
        <NSelect v-model:value={form[item.prop]} options={optionMap[item.prop]} />
      </NFormItem>
    )
  }

  const renderComp = (itemList, form, optionMap?) => {
    const obj = {
      input: renderInput
      , select: renderSelect
    }
    return itemList.map((item) => {
      return (
        <NGi span={item.width || 12}>
          {obj[item.type] && obj[item.type](form, item, optionMap)}
        </NGi>
      )
    })
  }
  const buildRule = (props: Props) => {
    let baseRule = props.rule ? Object.assign(props.rule, defaultRule) : defaultRule
    let ruleOfProp = {}
    props.itemList.forEach((e) => {
      e.rule && (ruleOfProp[e.prop] = baseRule[e.rule])
    })
    finalRule.value = ruleOfProp
  }
  const validForm = () => {
    return formRef.value.validate()
  }
  const submit = async (propSubmit) => {
    await validForm()
    propSubmit()
  }
  const renderBtn = (props) => {
    return props.hideBtn ? '' :
      (
        <div style={{ display: 'flex' }}>
          <NButton style="width:90%;height:40px;margin:0 auto;" type="primary" onClick={() => { props.submitFn && submit(props.submitFn) }}>提交</NButton>
        </div>
      )
  }


  const mount = (props: Props) => {
    buildRule(props)
    // formRef.value = el.el.__vueParentComponent.ctx
  }

  const MyFormWarp: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit, attrs } = ctx
      Object.assign(style, props.style)
      // let item = props.item
      data.props = props

      return (
        <NSpin show={spinShow.value}>
          <NForm model={props.form} ref={formRef} rules={finalRule.value} size="medium" labelPlacement="left" v-getComp={() => { mount(props) }} >
            <NGrid xGap={12} yGap={8}>
              {renderComp(props.itemList, props.form, props.optionMap)}
            </NGrid>
          </NForm>
          {renderBtn(props)}
        </NSpin>
      )
    }
  // export default (() => gridInput)(); //只有这样才能正常使用defineAsyncComponent挂载

  return {
    MyFormWarp
    , spinShow
    , formRef
    , validForm
  }
}


