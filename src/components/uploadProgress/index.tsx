import { ref, FunctionalComponent, reactive, watch, Ref,computed } from 'vue'
import style from './index.module.scss'
import { NIcon } from 'naive-ui'
import { CloudSyncComplete32Regular } from '@vicons/fluent'
import { sleep } from '@/utils'

interface Props {
  prog: number,
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}

const completeStyle = reactive({
  top:'0'
})
const pg = ref(0)
const showComplete = async () => {
  completeStyle.top = '-100%'
  await sleep(2000)
  completeStyle.top = '0'
}


watch(() => pg.value, () => {
  if (pg.value == 100) {
    console.log(`over`,);
    showComplete()
  }
})
const pgCompute = computed(() => {
  if(pg.value!=100){
    return pg.value
  }else{
    return 0
  }
})


const uploadProgress: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)
    pg.value = props.prog
    const barStyle = {
      left: (pgCompute.value - 100) + '%'
    }
    
    return (
      <div class={style.con}>
        <div class={style.bar} style={barStyle}></div>
        <div class={style.complete} style={completeStyle}>
          <NIcon size="30">
            <CloudSyncComplete32Regular />
          </NIcon>
        </div>
      </div>
    )
  }
export default uploadProgress;

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
