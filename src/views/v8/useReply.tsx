import { getTBComment, getV8, getV8Comment, getV8Post, getTBPost, replyTB, replyComment } from '@/apis'
import useMySkeleton from '@/components/mySkeleton/useMySkeleton'
import { ref, FunctionalComponent, reactive, watch, Ref, computed, nextTick } from 'vue'
import { NButton, NIcon, NDropdown, NSpace, NImage, NDrawer, NDrawerContent, NPagination, NSelect, NInput } from 'naive-ui'
import { ajaxPromiseAll, sleep } from '@/utils';
import { Left } from '@icon-park/vue-next';
import { TransitionPresets, useMouse, useTransition } from '@vueuse/core';

enum replyType { tie, comment }
const useReply = (curUrl, curBa, getDataFn, isLastPageFn, detailShow, curComment) => {
  const { x, y } = useMouse()
  const innerHeight = window.innerHeight
  const ypos = ref(40)
  const drawShow = ref(false)
  const input = ref('')
  const loading = ref(false)
  const addDrawer = ref(false)
  const replyType = ref<replyType>(0)
  const showDrawer = () => {
    // input.value = ''
    replyType.value = 0
    drawShow.value = true
  }
  const processInput = () => {
    return input.value.replaceAll('\n', '[br]')
  }
  const submit = () => {
    let list = [submitTie, submitComment]
    list[replyType.value] && list[replyType.value]()
  }
  const submitTie = async () => {
    let data = { fid: curBa.value.fid, fname: curBa.value.name, tid: curUrl.value.split('/')[2], content: processInput() }
    loading.value = true
    let res = await replyTB(data)
    // console.log("🚀 ~ file: useReply.tsx ~ line 24 ~ submit ~ res", res)
    loading.value = false
    if (res['err_code'] == 0) {
      input.value = ''
      isLastPageFn() && getDataFn()()
      drawShow.value = false
    }
  }
  const submitComment = async () => {
    let data = { fid: curBa.value.fid, fname: curBa.value.name, tid: curUrl.value.split('/')[2] }
    data['quoteId'] = curComment.value.quoteId
    curComment.value.repostid && (data['repostid'] = curComment.value.repostid)
    let obj = {
      layer: () => {
        data['content'] = input.value
      }
      , layerIn: () => {
        data['content'] = `回复 [showname portrait=${curComment.value.proId} use=reply]${curComment.value.userName}[/showname] :${input.value}`
        data['hasReplyName'] = true
      }
    }
    obj[curComment.value.type]()
    loading.value = true
    let res = await replyComment(data)
    loading.value = false
    if (res['err_code'] == 0) {
      input.value = ''
      drawShow.value = false
    }
  }
  watch(y, (n, o) => {
    n > (innerHeight - 200) && (ypos.value = 0)
    n <= (innerHeight - 200) && (ypos.value = 40)
  })
  watch(detailShow, (n) => {
    n && (drawShow.value = false)
    n && sleep(1000).then(() => {
      addDrawer.value = true
    })
    !n && (addDrawer.value = false)
  })
  const render = () => {
    return [
      <div class={'fixed -bottom-2 right-96'} style={{
        transition: 'transform 0.1s ease-in-out', transform: `translate3d(
      0px,${ypos.value}px,0px) rotate(90deg)`
      }}><NButton round type={'primary'} onClick={showDrawer} v-slots={{
        icon: () => <Left theme="outline" fill="#333" />
      }} >{`        `}</NButton></div>
      , addDrawer.value && <NDrawer v-model:show={drawShow.value} width={700} height={240} trapFocus={false} to={'#DetailDiv'} placement={'bottom'}>
        <NDrawerContent title={'回复'} >
          <NInput v-model:value={input.value} type={'textarea'}  ></NInput>
          <div class={'flex'}><NButton class={'mt-4 w-4/5 mx-auto'} round type={'primary'} onClick={submit} loading={loading.value} >发布</NButton></div>
        </NDrawerContent>
      </NDrawer>
    ]
  }
  return {
    render
    , replyType
    , drawShow
  }
}

export default useReply

export type {
  replyType
}