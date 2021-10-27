import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
import style from './dashIndex.module.scss'
import './grid.scss'
import { GridLayout } from 'vue3-grid-layout'
import useGrid from './useGrid'
import recoverGridItem from './child/recover'

interface Props {
  prog?: number,
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
const gridLayoutRef = ref<InstanceType<typeof GridLayout>>()
const grid = useGrid(gridLayoutRef)
const renderComp = (item, curClickBtnI) => {
  let res = (<div>{item.text}</div>)
  const obj = {
    iconbtn: () => { res = recoverGridItem(item, grid.recoverSize) }
    , icon: () => { res = (<iconLink item={item} />) }
    , input: () => { res = (<gridInput item={item} h={item.h} curClickBtnI={curClickBtnI} />) }
    , chart: () => { res = (<chartCon item={item} />) }
    , upload: () => { res = (<gridUploader item={item} curClickBtnI={curClickBtnI} />) }
    , list: () => { res = (<gridList item={item} w={item.w} curClickBtnI={curClickBtnI} />) }
  }
  obj['btn'] = obj['icon']
  obj[item.type] && obj[item.type]()
  return (
    <>
      {res}
    </>
  )
}
let lay = reactive(grid.layout)

const dashIndex: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <div class={style.dash}>
        <GridLayout v-getComp={(el) => { gridLayoutRef.value = el;}} v-model:layout={lay} colNum={12} rowHeight={30} isDraggable={grid.gridConfig.draggable} isResizable={grid.gridConfig.resizable} verticalCompact={grid.gridConfig.compact} useCssTransforms={true} >
          {grid.renderItem(renderComp, lay)}
        </GridLayout>
        <dock />
      </div>
    )
  }
export default dashIndex;

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
