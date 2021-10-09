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
getData.getMemData()
const event = useEvent()

const memPercent: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { slots, emit } = ctx
    Object.assign(style, props.style)

    return (
      <div class={style.con} onClick={() => event.handleClick(getData.getMemData)}>
        <VChart class={style.chart} option={option} />
      </div>
    )
  }
export default memPercent;