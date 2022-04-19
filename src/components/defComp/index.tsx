import { ref, FunctionalComponent, reactive, Ref, onMounted, defineComponent, PropType } from 'vue'
import { NEllipsis } from 'naive-ui';
export default defineComponent({
  inheritAttrs: false,
  props: {
    // ...Props
    curClickBtnI: Object as PropType<Ref<string>>,
    item: Object as PropType<gridItem>,
    te: String,
    style: Object as PropType<CSSModuleClasses>,
  }
  , emits: {
    childClick(payload: { dd: string }) {
      return payload.dd
    }
  }
  , name: 'DefComp'
  , setup(props, { slots, attrs }) {
    console.log("🚀 ~ file: index.tsx ~ line 18 ~ ,setup ~ ctx slot", slots.default!())
    onMounted(() => {
      console.log(`test Def`, props);
    })
    const dd = reactive({})
    const elref = ref()
    

    onMounted(() => {
      console.log("🚀 ~ file: index.tsx ~ line 25 ~ ,setup ~ elref", elref.value)
    })
    console.log("🚀 ~ file: index.tsx ~ line 44 ~ ,setup ~ slotsDDDD", JSON.stringify(slots.default))
    const elRender = () => ( //这里的slot会被当做一个子组件(带有default函数返回vnode数组的对象)
      <NEllipsis style="max-width: 240px" ref={elref}>
        {slots}
        {/* {reactive({defalut:() => ['xcvvvvvvvvvcccccccccccccccccccccccccccccccccccccccccc']})} */}
      </NEllipsis>
    )

    return {
      elRender
      ,elref
      ,props
    }
  }
        
  , render() {
    const { $slots,elRender,props } = this
    console.log("🚀 ~ file: index.tsx ~ line 45 ~ ,render ~ elRender", elRender())
    return (
      <div>
        fuck comp DEFFFFFFF<br />
        {props.te}
        {$slots}
      </div>
    )
  }
})

