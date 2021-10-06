import { getCurrentInstance, CSSProperties, FunctionalComponent,defineComponent, withScopeId, reactive } from 'vue'
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
const mytestChild: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { slots, emit } = ctx

    return (
      <div>
        <child class='myChild' style={child2Style} />
      </div>
    )
  }
export default mytestChild;