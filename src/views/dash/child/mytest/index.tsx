import {getCurrentInstance, CSSProperties, FunctionalComponent,withScopeId } from 'vue'
import moonCardStyle from '@/components/MoonCard/index.cssr'
// import './index.scss'

interface Props {
  test: number,
  // style:CSSProperties
}

type Emit = {
  childClick: () => void;
}

const fuckStyle = {
  color:'red'
}

// const instance = getCurrentInstance()

// const withId = withScopeId(scopeId)

const mytest: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    return (
      <div style={fuckStyle}>
        fuckyou
        <div>
          {props.test}
        </div>
        <div class="moon-card-fuck">555555</div>
      </div>
    )
  }
export default mytest;

// import { defineComponent, ref } from "vue";
// export const Foo = defineComponent({render() { return <div>Test</div> }})