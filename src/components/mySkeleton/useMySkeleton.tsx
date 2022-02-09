import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent, VNode } from 'vue'
// import style from './index.module.scss'
import { useToolTip } from '@/utils/comp';
import { isLongPress, numToChinese, sleep } from '@/utils';
import { NInput, NSkeleton } from 'naive-ui';

interface Props {
  isLoading: Boolean
}
type Emit = {
  childClick: () => void;
}
const useMySkeleton = () => {
  const isPageClick = ref(false)
  const resData: any = ref(null)
  const totalHeight = ref(0)
  const skeletonNum = computed(() => {
    return Math.floor(totalHeight.value / 68)
  })
  // methods----------------------------------------------------------------------------------------------
  const renderSkeleton = (isLoading) => {
    const renderSk = () => { //多次渲染骨架行
      let list: VNode[] = []
      for (let i = 1; i <= skeletonNum.value; i++) {
        list.push(<div><NSkeleton text repeat={2} /><NSkeleton text style="width: 60%;" /><NSkeleton text style="width: 40%;visibility:hidden;" /></div>)
      }
      return list
    }
    return isLoading ? (
      <div class={'w-full h-full flex flex-col absolute p-1 justify-around z-50'}>
        {renderSk()}
      </div>
    ) : ''
  }
  const mount = (el) => {
    console.log(`el`,el);
    totalHeight.value = el[0].contentRect.height
  }
  const MySkeleton: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit } = ctx

      // let sty = JSON.parse(JSON.stringify(style))
      // Object.assign(sty, props.style)
      // let styleFather = Object.values({fdfa:'fff'})[0]
      return (
        <div class={'w-full h-full'} v-watchSize={(el) => { mount(el) }}>
          {renderSkeleton(props.isLoading)}
          {ctx.slots.default && ctx.slots.default()}
        </div>
      )
    }
  return {
    MySkeleton
  }
}

export default useMySkeleton;
