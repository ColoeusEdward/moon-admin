import { getTBComment, getV8, getV8Comment, getV8Post, getTBPost } from '@/apis'
import useMySkeleton from '@/components/mySkeleton/useMySkeleton'
import { ref, FunctionalComponent, reactive, watch, Ref, computed, nextTick } from 'vue'
import { NButton, NIcon, NDropdown, NSpace, NImage, NDrawer, NDrawerContent, NPagination, NSelect } from 'naive-ui'
import { ajaxPromiseAll, isLowResolution } from '@/utils';
import { Left } from '@icon-park/vue-next';
import { TransitionPresets, useMouse, useTransition } from '@vueuse/core';
const useChangeBa = (curBa) => {
  const { x, y } = useMouse()
  const innerWidth = window.innerWidth
  const list = [{ name: 'v', fid: '97650' }, { name: 'bilibili', fid: '2265748' }]
  const xpos = ref(40)
  const drawShow = ref(false)
  const tbOption = ref([{ label: 'v8', value: 0 }, { label: 'bili', value: 1 }])
  const curIdx = ref(0)
  const showDrawer = () => {
    drawShow.value = true
  }
  watch(x, (n, o) => {
    n > (innerWidth - 300) && (xpos.value = 0)
    n <= (innerWidth - 300) && (xpos.value = 40)
  })
  const changeB = (value) => {
    curBa.value = list[value]
  }
  const render = () => {
    return [
      <div class={'fixed -right-6 top-48'} style={{
        transition: 'transform 0.1s ease-in-out', transform: `translate3d(
      ${xpos.value}px,0px,0px)`
      }}><NButton round type={'primary'} onClick={showDrawer} v-slots={{
        icon: () => <Left theme="outline" fill="#333" />
      }} >{`        `}</NButton></div>
      , <NDrawer v-model:show={drawShow.value} width={isLowResolution() ? '70vw' : 400} >
        <NDrawerContent title={'切换'} >
          <NSelect v-model:value={curIdx.value} options={tbOption.value} onUpdateValue={changeB} ></NSelect>
        </NDrawerContent>
      </NDrawer>
    ]
  }
  return {
    render
  }
}

export default useChangeBa