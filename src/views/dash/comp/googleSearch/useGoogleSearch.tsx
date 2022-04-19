import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
// import style from './index.module.scss'
import { useToolTip } from '@/utils/comp';
import { getRelativePosition, isLongPress, numToChinese, sleep } from '@/utils';
import { jsonp } from 'vue-jsonp'
import { NIcon, NInput } from 'naive-ui';
import { Google } from '@icon-park/vue-next';


interface Props {
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
  clickFn?: () => void
}
type Emit = {
  childClick: () => void;
}
const useGoogleSearch = () => {
  const toolTip = useToolTip()
  const resData: any = ref(null)
  const searchVal = ref('')
  const inputRef = ref()


  // methods----------------------------------------------------------------------------------------------
  const search = (e) => {
    // console.log("🚀 ~ file: useGoogleSearch.tsx ~ line 37 ~ search ~ e", e)
    if (e.keyCode == 13) {
      window.open(`https://www.google.com/search?q=${searchVal.value}`)
      searchVal.value = ''
    }
  }
  const inputUpdate = () => {
    // let res = getRelativePosition(inputRef.value!.inputElRef!)
    // console.log("🚀 ~ file: useGoogleSearch.tsx ~ line 36 ~ inputUpdate ~ inputRef.value", inputRef.value)
    // console.log("🚀 ~ file: useGoogleSearch.tsx ~ line 36 ~ inputUpdate ~ res", res)
    
  }

  const mount = () => {

  }
  const GoogleSearch: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit } = ctx
      // let sty = JSON.parse(JSON.stringify(style))
      // Object.assign(sty, props.style)
      // let styleFather = Object.values({fdfa:'fff'})[0]
      return (
        <div class={'flex w-full h-full justify-center items-center'} v-getComp={(el) => { mount() }} onMouseup={() => { !isLongPress() }} onClick={() => { props.clickFn && props.clickFn() }}>
          <NInput style={{ fontSize: '16px', margin: '0 10px' }} v-model:value={searchVal.value} placeholder="" clearable onKeydown={search}  ref={(e) => { inputRef.value = e }} v-slots={{
            prefix: () => {
              return (<NIcon><Google theme="multi-color" size="24" fill={['#333', '#ffffff', '#FFF', '#ffffff']} /></NIcon>)
            }
          }}></NInput>
        </div>
      )
    }
  return {
    GoogleSearch
  }
}

export default useGoogleSearch;
