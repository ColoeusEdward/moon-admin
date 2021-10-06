import { getCurrentInstance, CSSProperties, FunctionalComponent,defineComponent, withScopeId, reactive } from 'vue'
import style from './index.module.scss'
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
        
      </div>
    )
  }
export default mytestChild;