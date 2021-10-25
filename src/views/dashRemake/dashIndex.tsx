import { ref, FunctionalComponent, reactive, watch, Ref, computed } from 'vue'
import style from './dashIndex.module.scss'
import './grid.scss'
import { NProgress, NIcon } from 'naive-ui'
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
const renderComp = (item) => {
  let res = (<div>{item.text}</div>)
  const obj = {
    iconbtn:()=>{res=recoverGridItem(item,grid.recoverSize)}

  }
  obj[item.type] && obj[item.type]()
  return (
    <>
      {res}
    </>
  )
}
let lay = reactive(grid.layout)

// methods----------------------------------------------------------------------------------------------

const dashIndex: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <div class={style.dash}>
        <GridLayout v-getComp={(el) => { gridLayoutRef.value = el }} v-model:layout={lay} colNum={12} rowHeight={30} isDraggable={grid.gridConfig.draggable} isResizable={grid.gridConfig.resizable} verticalCompact={grid.gridConfig.compact} useCssTransforms={true}>
          {grid.renderItem(renderComp, lay)}
        </GridLayout>
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
