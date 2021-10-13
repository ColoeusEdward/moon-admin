// export default function useChildNum() {
//   const renderNum = (value) => {
//     return (
//       <div>{value}</div>
//     )
//   }
//   return {
//     renderNum
//   }

// }
import { Ref, getCurrentInstance, CSSProperties, FunctionalComponent, withScopeId, reactive } from 'vue'
import { useChildStore } from '@/store/modules/child'

const childStore = useChildStore()
interface Props {
  num?: number,
}

type Emit = {
  // childClick: () => void;
  // getGGFn: (gg:() => void) => void;
}
const childNum: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { emit } = ctx
    // Object.assign(childStyle, props.style)
    return (
      // <div style={fuckStyle}>
      <div class='fuckChild'>
        {/* <div>{childStore.num}</div> */}
        <div>{props.num}</div>
      </div>
    )
  }
export default childNum;

