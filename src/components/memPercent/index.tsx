import { ref, FunctionalComponent, reactive } from 'vue'
import style from './index.module.scss'
import useEchart from './useEchart'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  // TooltipComponent,
  // LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import useGetData from './useGetData'
import useEvent from './useEvent'
// import { addListener, removeListener } from 'resize-detector'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  // TooltipComponent,
  // LegendComponent
]);

interface Props {
  test?: number,
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
const echartPar = useEchart()
const option = reactive(echartPar.option)
const getData = useGetData(option)
const event = useEvent()
// const fuck = ref<InstanceType<typeof VChart>>()
let vch = ref<InstanceType<typeof VChart>>()
let me = ref<HTMLElement>()
// event.checkRef(vch)
console.time('挂载时间')
const memPercent: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <div class={style.con} v-getComp={(el) => {me.value=el;memounted()}} onClick={() => event.handleClick(getData.getMemData)}>
        <VChart v-getComp={(el) => {vch.value=el;mounted()}} class={style.chart} option={option} autoresize />
      </div>
    )
  }
export default memPercent;

const mounted = async () => {
  console.timeEnd('挂载时间')
  console.log({vch});
  window.$socket.emit('getMemOnce')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}

const memounted = () => {
  // console.log(`me`,me.value);
  // addListener(me!.value!,() => {
  //   console.log(`fuck`,);
  // })
}