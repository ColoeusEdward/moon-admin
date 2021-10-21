import { render } from 'nprogress'
import { Ref, getCurrentInstance, CSSProperties, FunctionalComponent, defineComponent, withScopeId, reactive } from 'vue'
import childStyle from './child.module.scss'

import childNum from './useChildNum'
defineComponent(childNum)
interface Props {
  test?: Ref<number>,
  style?: CSSModuleClasses
}

type Emit = {
  childClick: () => void;
  getGGFn: (gg: () => void) => void;
}

const gg = () => {
  console.log(`fuclgg`,);
}
let times = 0
const testReRender = () => {
  console.log(`child render`,);
  times++;
  return times
}



const mytestChild: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { emit } = ctx
    testReRender()
    // Object.assign(childStyle, props.style)
    emit('getGGFn', gg)
    return (
      // <div style={fuckStyle}>
      <div class='fuckChild'>
        fuckyou
        <div>
          {/* {props.test} */}
        </div>
        <div class={childStyle.redRow}>555555</div>
        <div class={childStyle.dd}>ggb</div>
        <div class='normal'>normal</div>
        {/* <div>{props.test?.value}</div> */}
        {/* {testReRender()} */}
        {/* <childNum num={props.} /> */}
      </div>
    )
  }
export default mytestChild;