import { getCurrentInstance, CSSProperties, FunctionalComponent, withScopeId, reactive } from 'vue'
import childStyle from './child.module.scss'

interface Props {
  test?: number,
  style?: CSSModuleClasses
}

type Emit = {
  childClick: () => void;
}

const mytestChild: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { slots, emit } = ctx
    Object.assign(childStyle, props.style)
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
      </div>
    )
  }
export default mytestChild;