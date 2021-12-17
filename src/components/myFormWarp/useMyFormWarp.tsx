import { ref, FunctionalComponent, reactive, Ref } from 'vue'
import style from './index.module.scss'
import { isLongPress } from '@/utils';
import { NInput, NButton, NSpin, NForm, FormRules, NGrid, NGi, NFormItem } from 'naive-ui';
import useSubmit from './useSubmit';
import { useMouse } from '@vueuse/core';
interface formListItem {
  type: string
  label: string
  prop: string
  placeholder?:string
  inputType?:string
}
interface Props {
  // submitFn: (input: string, target: string) => void
  prog?: number
  style?: CSSModuleClasses
  rule: FormRules
  form: Object
  itemList: formListItem[]
}
type Emit = {
  childClick: () => void;
}
type reacData = {
  props?: Props
}
export default function useMyFormWarp() {
  const data: reacData = reactive({})
  const spinShow = ref(false)
  // methods----------------------------------------------------------------------------------------------
  const renderInput = (form,item) => {
    return (
      <NFormItem label={item.label} path={item.prop}>
        <NInput v-model:value={form[item.prop]} placeholder="" clearable />
      </NFormItem>
    )
  }

  const renderComp = (itemList,form) => {
    const obj = {
      input:renderInput
    }
    return itemList.map((item) => {
      return (
        <NGi span={item.width || 12}>
          {obj[item.type] && obj[item.type](form,item)}
        </NGi>
      )
    })
  }

  const myFormWarp: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit, attrs } = ctx
      Object.assign(style, props.style)
      // let item = props.item
      data.props = props

      return (
        <NSpin show={spinShow.value}>
          <NForm model={props.form} rules={props.rule} size="medium"  labelPlacement="left" >
            <NGrid xGap={12} yGap={8}>
              {renderComp(props.itemList,props.form)}
            </NGrid>
          </NForm>
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
    myFormWarp
    ,spinShow
  }
}


