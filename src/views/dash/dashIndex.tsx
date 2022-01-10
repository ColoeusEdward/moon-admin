import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent, provide } from 'vue'
import style from './dashIndex.module.scss'
import './grid.scss'
import { GridLayout } from 'vue3-grid-layout'
import useGrid from './useGrid'
import recoverGridItem from './child/recover'
import useGridInput from '@/components/gridInput/useGridInput'
import useAccountList from '@/components/accountList/useAccountList'
import useSyncToYou from '@/components/syncToYou/useSyncToYou'
import useWeatherInfo from '@/components/weather'
interface Props {
  prog?: number,
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
const { AccountList } = useAccountList()
const { SyncToYou } = useSyncToYou()
const { WeatherInfo } = useWeatherInfo()
const gridLayoutRef = ref<InstanceType<typeof GridLayout>>()
const grid = useGrid(gridLayoutRef)
const renderComp = (item, curClickBtnI) => {
  let res = (<div>{item.text}</div>)
  const obj = {
    iconbtn: () => { res = recoverGridItem(item, grid.recoverSize) }
    , icon: () => { res = (<iconLink item={item} />) }
    , input: () => {
      const { gridInput } = useGridInput()
      res = (<gridInput item={item} h={item.h} curClickBtnI={curClickBtnI} />)
    }
    , chart: () => { res = (<chartCon item={item} />) }
    , upload: () => { res = (<gridUploader item={item} curClickBtnI={curClickBtnI} />) }
    , list: () => { res = (<gridList item={item} w={item.w} curClickBtnI={curClickBtnI} />) }
    , accList: () => {
      res = (<AccountList item={item} curClickBtnI={curClickBtnI} key={666} />)
    }
    , syncToYou: () => {
      res = (<SyncToYou item={item} h={item.h} curClickBtnI={curClickBtnI} />)
    }
    , weather: () => {
      res = (<WeatherInfo item={item} />)
    }
  }
  obj['btn'] = obj['icon']
  obj[item.type] && obj[item.type]()
  return (
    <>
      {res}
    </>
  )
}
let lay = grid.layout

const dashIndex: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <div class={style.dash}>
        {/* @ts-ignore */}
        <GridLayout v-getComp={(el) => { gridLayoutRef.value = el; }} v-model:layout={lay} colNum={12} rowHeight={30} isDraggable={grid.gridConfig.draggable} isResizable={grid.gridConfig.resizable} verticalCompact={grid.gridConfig.compact} useCssTransforms={true} style="padding-bottom:80px;">
          {grid.renderItem(renderComp, lay)}
        </GridLayout>
        <dock onNeedRecover={grid.recoverSize} />
      </div>

    )
  }
export default (() => dashIndex)();

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
