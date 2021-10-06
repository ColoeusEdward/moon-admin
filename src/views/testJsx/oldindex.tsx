import { getCurrentInstance, CSSProperties, FunctionalComponent, defineComponent, withScopeId, reactive } from 'vue'
import { NDataTable } from 'naive-ui'
import useTableData from './tableData'
// import './index.scss'
import mytestChild2 from './child/child2'
import mytestChild from './child/child'
// import indexStlye from './index.module.scss'
import indexStyle from './index.cssr'
defineComponent(mytestChild)
defineComponent(mytestChild2)

interface Props {
  test?: number,
  style?: CSSProperties
}

type Emit = {
  childClick: () => void;
}

const fuckStyle = {
  color: 'red'
}

const tableData = useTableData()
const data = reactive(tableData.data)
tableData.asyncData(data)


// const instance = getCurrentInstance()

// const withId = withScopeId(scopeId)
indexStyle.mount()

const mytest: FunctionalComponent<Props, Emit> =
  (props, ctx) => {
    // const { slots, emit } = ctx

    return (
      // <div style={fuckStyle}>
      <>
      <div class='moon-testjsx'>
        <div>css module 可以做到样式穿透, 考虑继续使用tsx方案</div>
        <mytestChild  />
        <mytestChild2 />
        {/* {mytestChild({style:indexStlye})} */}
        <NDataTable columns={tableData.columns} data={data} rowClassName='redRow' />
        fuckyou
        <div>
        </div>
        <div class="moon-testjsx__test">555555</div>
      </div>
      </>
    )
  }
export default mytest;
// export {indexStlye}

// import { defineComponent, ref } from "vue";
// export const Foo = defineComponent({render() { return <div>Test</div> }})