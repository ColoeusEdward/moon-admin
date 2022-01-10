import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
import style from './index.module.scss'
import { useToolTip } from '@/utils/comp';
import { isLongPress } from '@/utils';
import { getWeatcherInfo } from '@/apis';


interface Props {
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
  clickFn?: () => void
}
type Emit = {
  childClick: () => void;
}
const useWeatherInfo = () => {
  const toolTip = useToolTip()

  // methods----------------------------------------------------------------------------------------------
  const contentRender = (item, sty) => {
    return (
      <div class={sty.imgCon}>
        <img class={sty.img} src={item.src} alt={item.text} />
      </div>
    )
  }
  const getInfo = async () => {
    let res = await getWeatcherInfo()
    console.log("🚀 ~ file: index.tsx ~ line 39 ~ getInfo ~ res", res)
  }
  const mount = () => {
    getInfo()
  }
  const WeatherInfo: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit } = ctx
      let sty = JSON.parse(JSON.stringify(style))
      Object.assign(sty, props.style)
      // let styleFather = Object.values({fdfa:'fff'})[0]
      return (
        <div class={'flex-initial w-full h-full justify-center items-center'} v-getComp={(el) => { mount() }} onMouseup={() => { !isLongPress() }} onClick={() => { props.clickFn && props.clickFn() }}>
          <div class={'flex-initial h-full justify-center items-center'}>

          </div>
          <div></div>
        </div>
      )
    }
  return {
    WeatherInfo
  }
}

export default useWeatherInfo; //只有这样才能正常使用defineAsyncComponent挂载
