import { getTBComment, getV8, getV8Comment, getV8Post, getTBPost, getPageTBComment } from '@/apis'
import useMySkeleton from '@/components/mySkeleton/useMySkeleton'
import { ref, FunctionalComponent, reactive, watch, Ref, computed, nextTick } from 'vue'
import { DomHandler, DomHandlerOptions, Element, Document } from "domhandler";
import * as htmlparser2 from "htmlparser2";
import { NButton, NIcon, NDropdown, NSpace, NImage, NDrawer, NDrawerContent, NPagination, NScrollbar } from 'naive-ui'
import { ajaxPromiseAll, isLowResolution, sleep } from '@/utils';
import useReply, { replyType } from './useReply';
type postData = {
  content: string | any[]
  , id: string
  , author: string
  , time: string
  , imgList?: string[]
  , floor: string
  , reList?: { type: string, val: string, proId: string }[][]
  , reData: Object
  , rePn: number
  , reLoading: boolean
  , skComp: any
  , pageCount: number
}
//todo    回复分页
const useDetail = (curUrl, curItem, curBa) => {
  const drawShow = ref(false)
  const postList = ref<postData[]>([])
  const loading = ref(false)
  const pn = ref(1)
  const pcount = ref(1)
  const curComment = ref({})
  const xRef = ref(0)
  const yRef = ref(0)
  const dropDownShow = ref(false)
  const is404Ref = ref(false)
  // const curDropDownOpt = ref([{label:'',key:''}])

  const { MySkeleton } = useMySkeleton()
  const Reply = useReply(curUrl, curBa, () => getData, () => pn.value == pcount.value, drawShow, curComment)


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
  const is404 = (str) => {
    return str.search('贴吧404') != -1
  }
  const getData = async () => {
    postList.value = []
    is404Ref.value = false
    curComment.value = {}
    const tid = curUrl.value.split('/')[2]
    loading.value = true
    const resList = await ajaxPromiseAll([getTBPost({ tid: tid, p: pn.value }), getTBComment({ tid: tid, fid: curBa.value.fid, p: pn.value })])
    loading.value = false
    // console.log("🚀 ~ file: useDetail.tsx ~ line 37 ~ getData ~ resList", resList)
    is404Ref.value = !is404(resList[0])
    is404Ref.value && parseData(resList[0], resList[1].data)
  }
  const buildAuthor = (ele) => {
    // console.log("🚀 ~ file: useDetail.tsx ~ line 56 ~ buildAuthor ~ ele", ele)
    // let res = ''
    let isVip = false
    if (ele.children.length > 1) {
      let list: any[] = []
      ele.children.filter(e => e.type != 'text').forEach((ee) => {
        ee.attribs && ee.attribs.class == 'pre_icon_wrap pre_icon_wrap_theme1 d_name_icon' && (isVip = true)
        if (ee.name == 'a') {
          ee.children.forEach(e => {
            // console.log("🚀 ~ file: useDetail.tsx ~ line 79 ~ ele.children.filter ~ e", e)
            let type = ''
            e.type == 'text' && (type = 'text')
            e.name == 'a' && (type = 'atext')
            e.name == 'img' && e.attribs.class == 'nicknameEmoji' && (type = 'img')

            let d = {
              type: type
              , val: ''
            }
            type == 'text' && (d.val = e.data)
            type == 'atext' && (d.val = e.children[0].data)
            type == 'img' && (d.val = e.attribs.src)
            list.push(d)
          })
        }
      })
      isVip && list.unshift({ type: 'text', val: '👑' })
      return list
    }
    return ele.children[0].children[0].data
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
      let d = {}
      e.type == 'text' && (d = { type: 'text', val: e.data })
      e.name == 'img' && (d = { type: 'face', val: e.attribs.src })
      e.name == 'img' && e.attribs.class.search('BDE_Image') != -1 && (d = { type: 'img', val: e.attribs.src })
      e.name == 'br' && (d = { type: 'br', val: '' })
      e.name == 'a' && (d = { type: 'text', val: e.children[0].data })
      // console.log("🚀 ~ file: useDetail.tsx ~ line 49 ~ res=ele.children.filter ~ e", e.type == 'text',e)
      // if(type=='')
      //   console.log(`eee`,e);
      // let d = {
      //   type: type
      //   , val: type == 'text' ? e.data : type == 'br' ? '' : e.attribs.src
      // }
      return d
    })
    return res
  }
  const buildReList = (cdata, id) => {
    let strList = cdata.comment_list[id]?.comment_info.map(e => {
      return { str: `${e.show_nickname}: ${e.content}`, info: { userId: e.user_id, repostid: e.comment_id } }
    })
    // console.log("🚀 ~ file: useDetail.tsx ~ line 119 ~ buildReList ~ strList", strList)
    let resList = []

    strList && (resList = strList.map((e) => {
      let dom = htmlparser2.parseDocument(e.str)
      // console.log("🚀 ~ file: useDetail.tsx ~ line 120 ~ buildReList ~ dom", dom)
      let list = dom.children.map((ee: any) => {
        // console.log("🚀 ~ file: useDetail.tsx ~ line 126 ~ list ~ ee", ee)
        let res = {}
        ee.type == 'text' && (res = { type: 'text', val: ee.data })
        ee['name'] == 'a' && (res = { type: 'text', val: `【` + ee['children'][0].data + `】` })
        ee['name'] == 'img' && (res = { type: 'img', val: ee.attribs.src })
        res['proId'] = cdata.user_list[e.info.userId].portrait
        res['quoteId'] = id
        res['repostid'] = e.info.repostid
        return res
      })

      return list
    }))
    // console.log("🚀 ~ file: useDetail.tsx ~ line 121 ~ buildReList ~ resList", resList)
    return resList
  }
  const judgeFn = (name) => {
    return (e) => e.attribs && (e.attribs.class == name || e.attribs.id == name)
  }
  const judegFnNon = (name) => {
    return (e) => {
      return !judgeFn(name)(e)
    }
  }
  const judgeFnList = (nameList: string[], isNon) => {
    return (item) => {
      return nameList.every(name => {
        return isNon ? judegFnNon(name)(item) : judgeFn(name)(item)
      })
    }
  }
  const judgeFn2 = (name) => {
    return (e) => e.name && e.name == name
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
      const tailInfo = core_reply.children[0].children.find(judgeFn('post-tail-wrap')).children.filter(judgeFnList(['p_reply p_reply_first', 'j_lzl_r p_reply'], true))
      let pauth = le.children[1].children.myChildFind(judgeFn('p_author'))
      // console.log("🚀 ~ file: useDetail.tsx ~ line 101 ~ parseData ~ pauth", le.children[1])

      let cont = le.children[2].children[1].children.myChildFind(judgeFn2('cc'))
      // console.log("🚀 ~ file: useDetail.tsx ~ line 103 ~ parseData ~ cont", cont)
      const id = cont.children[2].attribs.id.split('_')[2]
      const { MySkeleton } = useMySkeleton()
      const pgC = cdata.comment_list[id] ? Math.ceil(cdata.comment_list[id]['comment_num'] / cdata.comment_list[id]['comment_list_num']) : 1
      let data: postData = {
        content: buildContent(cont.children[2])
        , id: id
        , author: buildAuthor(pauth.children[5])
        , floor: tailInfo.slice(-2)[0].children[0].data
        , time: tailInfo.slice(-1)[0].children[0].data
        , reList: buildReList(cdata, id)
        , reData: cdata.comment_list[id]
        , rePn: 1
        , reLoading: false
        , skComp: MySkeleton
        , pageCount: pgC
      }
      // console.log("🚀 ~ file: indexTSX.tsx ~ line 37 ~ parseData ~ data", data)
      return data
    })
    console.log("🚀 ~ file: useDetail.tsx ~ line 72 ~ parseData ~ list", list)
    console.log(`cdata`, cdata);
    postList.value = list
  }
  const commentClick = (type, item) => {
    console.log("🚀 ~ file: useDetail.tsx ~ line 223 ~ commentClick ~ type", type)
    // debugger
    let obj = {
      layer: () => { curComment.value = { type, quoteId: item.id } }
      , layerIn: () => { curComment.value = { type, quoteId: item[0].quoteId, proId: item[0].proId, userName: item[0].val.split(': ')[0], repostid: item[0].repostid } }
    }
    if (Object.keys(curComment.value).length == 0) {
      obj[type]()
    }
    let uw = watch(() => dropDownShow.value, (n) => {
      // console.log(`watch`,);
      !n && !obj[type]() && uw()
      !n && console.log(`watch`,)
      // console.log("🚀 ~ file: useDetail.tsx ~ line 204 ~ commentClick ~ curComment.value", curComment.value)
    })
  }
  const dropDownClick = (key) => {
    dropDownShow.value = false
    // console.log(`key`, key);
    Reply.replyType.value = 1
    Reply.drawShow.value = true
  }
  const handleContextMenu = (e) => {
    e.preventDefault()
    dropDownShow.value = false
    // if(this.)
    nextTick(() => {
      if (Object.keys(curComment.value).length == 0)
        return
      dropDownShow.value = true
      xRef.value = e.clientX
      yRef.value = e.clientY
    })
  }
  const renderDropDown = () => {
    let obj = {
      layer: { label: '回复层', key: 'layer' }
      , layerIn: { label: `回复【${curComment.value['userName']}】`, key: 'layerIn' }
    }
    let optObj = obj[curComment.value['type']] || obj['layer']
    return (
      <NDropdown
        placement="bottom-start"
        trigger="manual"
        x={xRef.value}
        y={yRef.value}
        options={[optObj]}
        show={dropDownShow.value}
        onClickoutside={() => { dropDownShow.value = false }}
        onSelect={dropDownClick}
      />
    )
  }

  const renderRow = () => {
    const renderAuthor = (author) => {
      // console.log("🚀 ~ file: useDetail.tsx ~ line 145 ~ renderAuthor ~ author", author)
      if (typeof author == 'string') {
        return author
      }
      return author.map((e) => {
        let obj = {
          text: () => e.val
          , img: () => <NImage class={'relative top-0.5'} width="16" src={e.val} />
        }
        obj['vipText'] = obj.text
        return obj[e.type] && obj[e.type]()
      })
    }
    return postList.value.map(e => {
      let item = e
      const renderContent = () => {
        if (typeof e.content == 'string') {
          return e.content
        } else {
          return e.content.map((ce, idx) => {
            let obj = {
              text: () => {
                return <div class={'inline-block'}>{ce.val}</div>
              }
              , face: () => <div class={'inline-block relative top-0.5'}><NImage width="30" src={ce.val} /></div>
              , br: () => <div></div>
              , img: () => <div onContextmenu={(e) => {e.stopPropagation();}} class={'inline-block mr-1'} ><NImage width="50" src={ce.val} /></div>
            }
            // console.log(`obj[ce.type]`,ce,obj[ce.type]);
            return obj[ce.type] && obj[ce.type]()
          })
        }
      }
      const buildNewReList = (str) => {
        const dom = htmlparser2.parseDocument(str)
        console.log("🚀 ~ file: useDetail.tsx ~ line 218 ~ buildNewReList ~ dom", dom)
        // const conDiv = dom.children.splice(0, dom.children.length - 2)
        // console.log(`dom.children.splice(0, dom.children.length - 2)`,dom.children.slice(0, dom.children.length - 2));
        let list: typeof item.reList = dom.children.filter(judegFnNon('lzl_li_pager j_lzl_l_p lzl_li_pager_s')).map((e: any) => {
          let d: any[] = []
          // console.log("🚀 ~ file: useDetail.tsx ~ line 237 ~ letlist:typeofitem.reList=dom.children.slice ~ item", item)
          let proId = JSON.parse(e['attribs']['data-field']).portrait
          d.push({ type: 'text', val: e.children[3].children[0].children[0].data + `: `, proId })
          e.children[3].children[2].children.forEach(e => {
            e.type == 'text' && d.push({ type: 'text', val: e.data, proId: proId })
            e.attribs && e.attribs.class == 'BDE_Smiley' && d.push({ type: 'img', val: e.attribs.src, proId: proId })
          })
          // console.log("🚀 ~ file: useDetail.tsx ~ line 245 ~ letlist:typeofitem.reList=dom.children.splice ~ d", d)
          return d
        })
        e.reList = list
        console.log("🚀 ~ file: useDetail.tsx ~ line 230 ~ buildNewReList ~ list", list)
      }
      const getNewComment = async () => {
        e.reLoading = true
        let res = await getPageTBComment({ tid: curUrl.value.split('/')[2], pid: e.id, p: e.rePn })
        e.reLoading = false
        buildNewReList(res)
        // console.log("🚀 ~ file: useDetail.tsx ~ line 218 ~ getNewComment ~ res", res)
      }
      const renderReply = () => {
        const renderPagi = () => {
          return <NPagination v-model:page={e.rePn} pageSize={10} pageCount={e.pageCount} onUpdatePage={getNewComment} />
        }
        let list = e.reList && e.reList.map(ee => {
          return <div class={'p-1 leading-relaxed hover:bg-slate-800'} onMousedown={(e) => { e.stopPropagation(); commentClick('layerIn', ee) }} >
            {ee.map((eee, idx) => {
              let obj = {
                text: () => {
                  let matchRes = eee.val.match(/【(\S+)】/)
                  if (matchRes) {
                    return ['【', <div class={'inline-block text-amber-500'}>{matchRes[1]}</div>, '】']
                  }
                  if (idx != 0) {
                    return eee.val
                  }
                  let list = eee.val.split(': ')
                  return [<div class={'inline-block text-amber-500'}>{list[0]}</div>, ': ', list[1]]
                }
                , img: () => <div class={'inline-block relative top-0.5'}><NImage width="16" src={eee.val} /></div>
              }
              return obj[eee.type] && obj[eee.type]()
            })}
          </div>

        })
        return e.reList && e.reList.length > 0 && (
          <div class={'text-sm bg-black p-1 rounded'}>
            <e.skComp isLoading={e.reLoading} >
              <div class={'w-full h-full'}>
                {list}
                {e.reData && e.pageCount >= 2 && renderPagi()}
              </div>

            </e.skComp>

          </div>
        )
      }
      return (
        <div class={'text-slate-400 hover:bg-gray-900 p-3'} onMousedown={() => { commentClick('layer', e) }}>
          <div class={'inline-block w-4/5 text-left'}>
            {/* <div class={'text-base'}>{item.title}</div> */}
            <div class={'text-sm leading-relaxed'}>{renderContent()}</div>
            {renderReply()}
          </div>
          <div class={'inline-block w-1/5 text-right'}>
            <div><div class={'inline-block mr-1'}>{renderAuthor(e.author)}</div> <div class={'text-sm text-slate-500 inline-block'}>{e.floor}</div></div>
            <div class={'text-sm text-slate-500'}>{e.time}</div>

          </div>
        </div>
      )
    })
  }
  const render = () => {
    return (
      <NDrawer v-model:show={drawShow.value} width={isLowResolution() ? '90vw' : 700} >
        <NDrawerContent title={curItem.value.title} bodyContentStyle={{ padding: 0, overflow: 'hidden' }} v-slots={{
          footer: () => <NPagination v-model:page={pn.value} pageSize={15} pageCount={pcount.value} onUpdatePage={getData} />
        }}>
          <MySkeleton isLoading={loading.value}  >
            <div class={'w-full h-full overflow-hidden'} id={'DetailDiv'} onContextmenu={handleContextMenu}>
              <NScrollbar >
                {renderRow()}
                {Reply.render()}
                {renderDropDown()}
                {/* <div class={'absolute bottom-0'} style={{ height: '5px' }} ></div> */}
                {/* {is404Ref.value && <div class={'mt-10 text-2xl text-gray-500 text-center'}>404</div>} */}
              </NScrollbar>
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