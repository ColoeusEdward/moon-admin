import { getV8, getV8Comment, getV8Post } from '@/apis'
import useMySkeleton from '@/components/mySkeleton/useMySkeleton'
import { ref, FunctionalComponent, reactive, watch, Ref, computed, nextTick } from 'vue'
import { DomHandler, DomHandlerOptions, Element, Document } from "domhandler";
import * as htmlparser2 from "htmlparser2";
import { NButton, NIcon, NDropdown, NSpace, NImage } from 'naive-ui'
import { Refresh, Comments } from '@icon-park/vue-next'
import useDetail from './useDetail';
// import {} from 'htmlparser2'
interface Props {
  prog?: number,
  style?: CSSModuleClasses
}
type Emit = {
  childClick: () => void;
}
type postData = {
  title: string
  , info: string
  , replyNum: number
  , url: string
  , author: string
  , lastTime: string
  , imgList?: string[]
}

const useIndexTSX = () => {
  const { MySkeleton } = useMySkeleton()
  const loading = ref(false)
  const dropDownShow = ref(false)
  const xRef = ref(0)
  const yRef = ref(0)
  const curUrl = ref('')
  const curItem = ref({})
  const dataList = ref<postData[]>([])
  const Detail = useDetail(curUrl, curItem)


  //---------------------------------------------------------------------------------------------------------
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    dropDownShow.value = false
    nextTick().then(() => {
      dropDownShow.value = true
      xRef.value = e.clientX
      yRef.value = e.clientY
    })
  }
  const closeDrop = () => {
    dropDownShow.value = false
  }
  const handleSelect = (key) => {
    dropDownShow.value = false
    console.log(`key`, key);
    window.open('https://tieba.baidu.com' + key)
    // curUrl.value = key
  }
  const rowClick = (e, item) => {
    if (e.button == 0) {
      Detail.drawShow.value = true
      curItem.value = item
      // Detail.getData()
    }
  }
  const parseData = (str) => {
    const dom = htmlparser2.parseDocument(str)
    let list: postData[] = (dom.children[0] as Element).children.filter(e => {
      return e.type != 'text' && e['name'] != 'div' && e['attribs']['class'] != 'thread_top_list_folder'
    }).map((le: any) => {
      const item = le.children[1]
      const left = item.children[1]
      const right = item.children[3]
      // console.log(`le`, { left, right });
      const imgEleList = right.children[3].children[1].children[3]?.children[5]?.children[1].children[1].children
      let data: postData = {
        title: right.children[1]?.children[1]?.children[1]?.children[0]?.data
        , url: right.children[1]?.children[1]?.children[1]?.attribs.href
        , info: right.children[3]?.children[1]?.children[1]?.children[0]?.data || ' '
        , replyNum: left.children[1].children[0].data
        , author: right.children[1].children[2].children[1].attribs.title.split(': ')[1]
        , lastTime: right.children[3].children[3].children[3].children[0].data
        , imgList: imgEleList ? imgEleList.map(e => e.children[0].children[0].attribs.bpic) : []
      }
      // console.log("🚀 ~ file: indexTSX.tsx ~ line 37 ~ parseData ~ data", data)
      return data
    })
    dataList.value = list
  }
  const getData = async () => {
    dataList.value = []
    loading.value = true
    let res = await getV8()
    loading.value = false
    if (res.length == 0) {
      return
    }
    let startIdx = res.search(`<ul id=\"thread_list\"`)
    let endIdx = res.search(`</ul>\n\n<div class=\"thread`)
    let str = res.slice(startIdx, endIdx + 6)
    parseData(str)
  }


  const renderRow = (item: postData) => {
    const renderImgList = () => {
      return item.imgList?.map(e => {
        return (
          <div onMousedown={(e) => { e.stopPropagation() }}><NImage width="50" src={e} /></div>
        )
      })
    }
    return (
      <div class={'p-3 text-slate-400 hover:bg-gray-900'} onMousedown={(e) => { curUrl.value = item.url; rowClick(e, item) }}>
        <div class={'inline-block w-4/5 text-left'}>
          <div class={'text-base'}>{item.title}</div>
          <div class={'text-sm text-slate-500'}>{item.info}</div>
          <div><NSpace>{renderImgList()}</NSpace></div>
        </div>
        <div class={'inline-block w-1/5 text-right'}>
          <div>{item.author}</div>
          <div>
            <div class={'text-sm text-slate-500 inline-block mr-3'}>{item.lastTime}</div>
            <div class={'inline-flex align-baseline items-center'}>
              <Comments class={'relative top-0.5 mr-1'} theme="outline" fill="#fff" />
              {/* <NIcon style={{ height: '1ex' }}></NIcon> */}
              {item.replyNum}
            </div>
          </div>
        </div>
      </div>
    )
  }
  const renderList = () => {
    return dataList.value.map(e => {
      return renderRow(e)
    })
  }
  const renderRefresh = () => {
    return (
      <div class={'fixed right-40 bottom-10'}>
        <NButton class={'w-14 h-14 text-lg'} onClick={() => { getData() }} circle strong secondary type={"info"} size={'large'}><NIcon><Refresh size={90} /></NIcon></NButton>
      </div>
    )
  }
  const renderDropDown = () => {
    return (
      <NDropdown
        placement="bottom-start"
        trigger="manual"
        x={xRef.value}
        y={yRef.value}
        options={[{ label: '原文', key: curUrl.value }]}
        show={dropDownShow.value}
        onClickoutside={closeDrop}
        onSelect={handleSelect}
      />
    )
  }
  const mount = (el) => {
    getData()
  }
  const IndexTSX: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit } = ctx
      // console.log("🚀 ~ file: useMySkeleton.tsx ~ line 50 ~ useMySkeleton ~ ctx.slots", ctx.slots)
      // let sty = JSON.parse(JSON.stringify(style))
      // Object.assign(sty, props.style)
      // let styleFather = Object.values({fdfa:'fff'})[0]
      return (
        <div class={'w-full h-full'}  >
          <MySkeleton isLoading={loading.value} >
            <div class={'w-full h-full'} v-getComp={(e) => { mount(e) }} onContextmenu={handleContextMenu} >
              {renderList()}
              {renderRefresh()}
              {renderDropDown()}
              {Detail.render()}
            </div>
          </MySkeleton>
        </div>
      )
    }
  return {
    IndexTSX
  }
}

export default useIndexTSX