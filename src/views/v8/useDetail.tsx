import { getV8, getV8Comment, getV8Post } from '@/apis'
import useMySkeleton from '@/components/mySkeleton/useMySkeleton'
import { ref, FunctionalComponent, reactive, watch, Ref, computed, nextTick } from 'vue'
import { DomHandler, DomHandlerOptions, Element, Document } from "domhandler";
import * as htmlparser2 from "htmlparser2";
import { NButton, NIcon, NDropdown, NSpace, NImage, NDrawer, NDrawerContent, NPagination } from 'naive-ui'
import { ajaxPromiseAll } from '@/utils';
type postData = {
  content: string | any[]
  , id: string
  , author: string
  , time: string
  , imgList?: string[]
  , floor: string
}

const useDetail = (curUrl, curItem) => {
  const drawShow = ref(false)
  const postList = ref<postData[]>([])
  const { MySkeleton } = useMySkeleton()
  const loading = ref(false)
  const pn = ref(1)
  const pcount = ref(1)

  //----------------------------------------------------------------------------
  watch(curUrl, () => {
    console.log(`url change`,);
    pn.value = 1
    pcount.value = 1
    getData()
  })
  const getPageCount = (str) => {
    let i = str.search('尾页')
    let idx = str[i - 3]
    let idx2 = str[i - 4]
    // console.log("🚀 ~ file: useDetail.tsx ~ line 34 ~ getPageCount ~ idx2",idx, idx2)
    if (!idx2)
      return
    if (idx2 == '=') {
      pcount.value = idx * 1
    } else {
      pcount.value = (idx2 + idx) * 1
    }
  }
  const getData = async () => {
    postList.value = []
    const tid = curUrl.value.split('/')[2]
    loading.value = true
    const resList = await ajaxPromiseAll([getV8Post({ tid: tid, p: pn.value }), getV8Comment({ tid: tid, p: pn.value })])
    loading.value = false
    console.log("🚀 ~ file: useDetail.tsx ~ line 37 ~ getData ~ resList", resList)
    parseData(resList[0], resList[1].data)
  }
  const buildContent = (ele) => {
    // console.log("🚀 ~ file: useDetail.tsx ~ line 33 ~ buildContent ~ ele", ele)
    let res = ''
    if (ele.children.length == 1 && ele.children[0].type == 'text') {
      return ele.children[0].data
    }
    if (ele.children.length > 1 && ele.children[1].attribs && ele.children[1].attribs.class == 'post_bubble_top') {
      // console.log(`有泡泡`,ele.children[2].children[0]);
      return buildContent(ele.children[2].children[0])
      console.log("🚀 ~ file: useDetail.tsx ~ line 51 ~ == ~ buildContent ~ ele.children[1]", ele.children[1])
    }
    res = ele.children.map(e => {
      let type = ''
      e.type == 'text' && (type = 'text')
      e.name == 'img' && (type = 'face')
      e.name == 'img' && e.attribs.class.search('BDE_Image') != -1 && (type = 'img')
      e.name == 'br' && (type = 'br')
      // console.log("🚀 ~ file: useDetail.tsx ~ line 49 ~ res=ele.children.filter ~ e", e.type == 'text',e)
      // if(type=='')
      //   console.log(`eee`,e);
      let d = {
        type: type
        , val: type == 'text' ? e.data : type == 'br' ? '' : e.attribs.src
      }
      return d
    })

    return res
  }
  const judgeFn = (name) => {
    return (e) => e.attribs && (e.attribs.class == name || e.attribs.id == name)
  }
  const judgeFn2 = (name) => {
    return (e) =>e.name && e.name == name
  }
  const parseData = (pstr: string, cdata) => {
    getPageCount(pstr)
    pstr = pstr.slice(pstr.search(`<div class="p_postlist" id="j_p_postlist">`), pstr.search(`</div><div class="right_section right_bright">`))

    const dom = htmlparser2.parseDocument(pstr)
    let list: postData[] = (dom.children[0] as Element).children.filter(e => {
      return e.type != 'text' && e['name'] == 'div' && e['attribs']['class'] == 'l_post l_post_bright j_l_post clearfix  '
    }).map((le: any, idx) => {
      // console.log("🚀 ~ file: useDetail.tsx ~ line 41 ~ parseData ~ le", le)
      const core_reply = le.children[2].children.myChildFind(judgeFn('core_reply j_lzl_wrapper'))
      let pauth = le.children[1].children[idx == 0 && pn.value == 1 ? 3 : 1]
      pauth.attribs.class == 'louzhubiaoshi_wrap' && (pauth = le.children[1].children[3])

      let cont = le.children[2].children[1].children.myChildFind(judgeFn2('cc'))
      // console.log("🚀 ~ file: useDetail.tsx ~ line 103 ~ parseData ~ cont", cont)

      let data: postData = {
        content: buildContent(cont.children[2])
        , id: cont.children[2].attribs.id.split('_')[2]
        , author: pauth.children[5].children[1].children[0].data
        , floor: core_reply.children[0].children[1].children.slice(-2)[0].children[0].data
        , time: core_reply.children[0].children[1].children.slice(-1)[0].children[0].data
      }
      // console.log("🚀 ~ file: indexTSX.tsx ~ line 37 ~ parseData ~ data", data)
      return data
    })
    console.log("🚀 ~ file: useDetail.tsx ~ line 72 ~ parseData ~ list", list)
    postList.value = list
  }
  const renderRow = () => {
    return postList.value.map(e => {
      const renderContent = () => {
        if (typeof e.content == 'string') {
          return e.content
        } else {
          return e.content.map((ce) => {
            let obj = {
              text: () => <div class={'inline-block'}>{ce.val}</div>
              , face: () => <div class={'inline-block'}><NImage width="30" src={ce.val} /></div>
              , br: () => <div></div>
              , img: () => <div><NImage width="50" src={ce.val} /></div>
            }
            // console.log(`obj[ce.type]`,ce,obj[ce.type]);
            return obj[ce.type] && obj[ce.type]()
          })
        }
      }
      return (
        <div class={'text-slate-400 hover:bg-gray-900 p-3'}>
          <div class={'inline-block w-4/5 text-left'}>
            {/* <div class={'text-base'}>{item.title}</div> */}
            <div class={'text-sm'}>{renderContent()}</div>
          </div>
          <div class={'inline-block w-1/5 text-right'}>
            <div><div class={'inline-block mr-1'}>{e.author}</div> <div class={'text-sm text-slate-500 inline-block'}>{e.floor}</div></div>
            <div class={'text-sm text-slate-500'}>{e.time}</div>

          </div>
        </div>
      )
    })
  }
  const renderFoot = () => {
    // return (

    // )
  }

  const render = () => {
    return (
      <NDrawer v-model:show={drawShow.value} width={660} >
        <NDrawerContent title={curItem.value.title} bodyContentStyle={{ padding: 0 }} v-slots={{
          footer: () => <NPagination v-model:page={pn.value} pageSize={15} pageCount={pcount.value} onUpdatePage={getData} />
          // ,header: () => {}
        }}>
          <MySkeleton isLoading={loading.value} >
            <div class={'w-full h-full'}>
              {renderRow()}
            </div>
          </MySkeleton>
        </NDrawerContent>
      </NDrawer>
    )
  }

  return {
    render
    , drawShow
    , getData
  }

}

export default useDetail