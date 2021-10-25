import { ref, FunctionalComponent, reactive, watch, Ref, computed } from 'vue'
import style from './index.module.scss'
import { NProgress, NIcon } from 'naive-ui'
import { sleep } from '@/utils'
import { IosPlay } from '@vicons/ionicons4'
import { PauseCircle24Filled } from '@vicons/fluent'
import { RestartAltRound } from '@vicons/material'
import { useSocketStore } from '@/store/modules/socket'
import useTimeCount from './timeCount'

interface Props {
  prog: number,
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
const socketStore = useSocketStore()
const timeCount = useTimeCount()
window.$socket?.emit('getTimeLoop')
const time = computed(() => {
  let totalS =  socketStore.time/1000
  let h:number = Math.floor((totalS/3600)%24)
  let m:number = Math.floor((totalS/60)%60)
  let s:number = Math.floor((totalS%60))
  return `${h}:${m<10?'0':''}${m}:${s<10?'0':''}${s}`
})
const percent = computed(() => {
  return 100 - (socketStore.time / socketStore.totalTime) * 100
})

// methods----------------------------------------------------------------------------------------------

const timeCounter: FunctionalComponent<Props, Emit> =
  // const mytestChild =
  (props, ctx) => {
    const { emit } = ctx
    Object.assign(style, props.style)

    return (
      <div class={style.con}>
        <NProgress
          style={{ width: '170px', height: '170px', marginTop: '10px' }}
          type="circle"
          percentage={percent.value}
          color="#fff"
          rail-color=''
          indicator-text-color="#fff" >
          <span style="text-align: center;font-size:20px;">{time.value}</span>
        </NProgress>
        <div class={style.btnCon}>
          <div class={style.start} onMouseup={(e) => { }} onClick={(e) => { e.stopPropagation(); timeCount.handleStart() }}><NIcon size='32'><IosPlay /></NIcon></div>
          <div class={style.stop} onMouseup={(e) => { }} onClick={(e) => { e.stopPropagation(); timeCount.handleStop() }}><NIcon size='32'><PauseCircle24Filled /></NIcon></div>
          <div class={style.reset} onMouseup={(e) => { }} onClick={(e) => { e.stopPropagation(); timeCount.handleReset() }}><NIcon size='32'><RestartAltRound /></NIcon></div>
        </div>
      </div>
    )
  }
export default timeCounter;

const mounted = async () => {
  // console.timeEnd('挂载时间')
  // await sleep(50)
  // vch.value?.resize()

  // console.log(`vch`,);
}
