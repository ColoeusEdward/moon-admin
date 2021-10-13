import { Ref, inject, getCurrentInstance, CSSProperties, FunctionalComponent, defineComponent, withScopeId, reactive } from 'vue'
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




const mytestChild: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { emit } = ctx

    Object.assign(childStyle, props.style)
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
        <div>{props.test?.value}</div>
        {/* <childNum num={props.} /> */}
      </div>
    )
  }
export default mytestChild;