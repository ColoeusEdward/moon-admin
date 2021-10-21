import { sleep } from '@/utils'
import {ref,provide, getCurrentInstance, CSSProperties, FunctionalComponent,defineComponent, withScopeId, reactive } from 'vue'
import { useChildStore } from '@/store/modules/child'
import child from './child'
import child2Style from './child2.module.scss'
defineComponent(child)
interface Props {
  test?: number,
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
const childStore = useChildStore()
const gg =  () => {
  console.log(``,);
}
const test = ref(555)

const changeTest = async () => {
  
  await sleep(2000)
  test.value = 999 //父组件的内容稍微改变一下就会导致子组件重新渲染, 函数式组件的缺陷, 所以子组件只需要执行一次的任务应该放到函数外, 然后缓存结果, 渲染dom的消耗那就无能为力了
  // childStore.setNum(5566)
}
const handeOnGetGG = (gg) => {
  gg()
}


const mytestChild: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { emit } = ctx
    console.log(`fatcher reRender`,);
    return (
      <div>
        fathcher:{test.value}
        <child class='myChild' v-getComp={(el) => {console.log(`child mounted`,);changeTest()}} style={child2Style} test={test} onGetGGFn={handeOnGetGG} />
        {/* <child class='myChild' v-getComp={(el) => {console.log(`child mounted`,);changeTest()}}  /> */}
      </div>
    )
  }
export default mytestChild;