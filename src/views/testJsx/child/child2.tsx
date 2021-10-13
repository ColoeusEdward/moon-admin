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
  test.value = 999 //改变一下prop就会导致子组件重新渲染, 函数式组件的缺陷
  // childStore.setNum(5566)
}

const mytestChild: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { emit } = ctx
    return (
      <div>
        <child class='myChild' v-getComp={(el) => {changeTest()}} style={child2Style} test={test}  onGetGGFn={(gg) => {gg()}} />
      </div>
    )
  }
export default mytestChild;