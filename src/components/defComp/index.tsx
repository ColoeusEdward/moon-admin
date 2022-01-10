import { ref, FunctionalComponent, reactive, Ref, onMounted, defineComponent, PropType } from 'vue'

export default defineComponent({
  props:{
    // ...Props
    curClickBtnI:Object as PropType<Ref<string>>,
    item:Object as PropType<gridItem>,
    te: String,
    style:Object as PropType<CSSModuleClasses>,
  }
  ,emits:{
    childClick(payload:{dd:string}){
      return payload.dd
    }
  }
  ,name: 'DefComp'
  , setup(props, ctx) {
    onMounted(() => {
      console.log(`test Def`, props);
    })
    const dd = reactive({})
    
    return () => (
      <div>
        fuck comp DEFFFFFFF<br />
        {props.te}
      </div>
    )
  }
})

