import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
// import style from './index.module.scss'
import { useToolTip } from '@/utils/comp';
import { isLongPress, numToChinese, sleep } from '@/utils';
import { jsonp } from 'vue-jsonp'

interface Props {
  item: gridItem
  prog?: number
  style?: CSSModuleClasses
  clickFn?: () => void
}
type Emit = {
  childClick: () => void;
}
type weatherData = {
  city: string
  , lunar: string
  , date: string
  , temp: string
  , week: string
}
const useWeatherInfo = () => {
  const toolTip = useToolTip()
  const resData: any = ref(null)
  const weatherData = computed<weatherData | null>(() => {
    if (resData.value) {
      let data = {
        city: resData.value.cityNameWithSuffix
        , lunar: resData.value.nongli
        , date: window.dayjs().format(`MM月DD号`)
        , temp: `${resData.value.day1.tempLow}℃~${resData.value.day1.tempHigh}℃ ${resData.value.day1.weather}`
        , week: `星期` + numToChinese(window.dayjs().format(`d`))
      }
      return data
    }
    return resData.value
  })


  // methods----------------------------------------------------------------------------------------------
  const weatherRender = () => {
    if (weatherData.value) {
      return (
        <>
          <div class={'flex flex-auto h-full w-1/4 justify-center items-start flex-col py-3 pl-3 space-y-4'} >
            <span>{weatherData.value.city}</span>
            <span class={'text-base font-bold'} >{weatherData.value.week}</span>
          </div>
          <div class={'flex flex-auto  h-full w-3/4 justify-center items-end flex-col py-3 pr-3 space-y-4'} >
            <span>{weatherData.value.date+' '+weatherData.value.lunar}</span>
            <span class={'text-base'}>{weatherData.value.temp}</span>
          </div>
        </>
      )
    } else {
      return '暂无数据'
    }

  }
  const getInfo = () => {
    // let res = await getWeatcherInfo()
    jsonp('https://tianqi.2345.com/api/getWeatherInfo.php').then((res) => {
      resData.value = res
    })
  }
  const loopGetInfo = async () => {
    while(true){
      getInfo()
      await sleep(600000)
    }
  }
  const mount = () => {
    loopGetInfo()
  }
  const WeatherInfo: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit } = ctx
      // let sty = JSON.parse(JSON.stringify(style))
      // Object.assign(sty, props.style)
      // let styleFather = Object.values({fdfa:'fff'})[0]
      return (
        <div class={'flex w-full h-full justify-center items-center'} v-getComp={(el) => { mount() }} onMouseup={() => { !isLongPress() }} onClick={() => { props.clickFn && props.clickFn() }}>
          {weatherRender()}
        </div>
      )
    }
  return {
    WeatherInfo
  }
}

export default useWeatherInfo;
