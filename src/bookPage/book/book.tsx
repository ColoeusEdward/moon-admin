import { ref, FunctionalComponent, reactive, watch, Ref, computed, defineComponent } from 'vue'
// import style from './index.module.scss'
import { useToolTip } from '@/utils/comp';
import { isLongPress, numToChinese, sleep } from '@/utils';
import { useBookStore } from '@/store/modules/book';
import { NInput } from 'naive-ui';

interface Props {

}
type Emit = {
  childClick: () => void;
}
const useBook = () => {
  let startTime = 0
  let endTime = 0
  let startX = 0
  let endX = 0
  const isPageClick = ref(false)
  const toolTip = useToolTip()
  const resData: any = ref(null)
  const bookStore = useBookStore()
  const text = computed(() => {
    return bookStore.content
  })
  const page = computed(() => {
    return bookStore.page
  })
  const pageInput = ref(0)

  // methods----------------------------------------------------------------------------------------------
  const nextPage = () => {
    console.log(`nextpage`,);
    window.$socket && window.$socket.emit('nextPage')
    window.$msg!.success('滑动')
  }
  const prevPage = () => {
    console.log(`prepage`,);
    window.$socket && window.$socket.emit('prevPage')
    window.$msg!.success('滑动')
  }
  const handleTouchStart = (e) => {
    startTime = new Date().getTime()
    startX = e.touches[0].screenX
    isPageClick.value=false
  }
  const handlePageFocus = () => {
    // console.log(`foucs`,);
    isPageClick.value = true
    pageInput.value = page.value
  }
  const handleKeyUp = (e) => {
    if(e.key == 'Enter'){
      console.log(`e`,e);
      window.$socket && window.$socket.emit('setPage',pageInput.value)
    }
  }
  const renderSideClick = () => {
    return (
      <>
        <div class={'w-3/12 h-4/5 fixed left-0 top-2'} onClick={prevPage}></div>
        <div class={'w-3/12 h-4/5 fixed right-0 top-2'} onClick={nextPage}></div>
      </>
    )
  }
  const renderPageNum = () => {
    let content = isPageClick.value ? (
      <div class={'flex items-center'}>
        第<NInput style={{width:'100px',fontSize:'26px'}} v-model:value={pageInput.value} onKeyup={handleKeyUp} />页
      </div>
    ) 
    : <p>第{page.value}页</p>
    return (
      <div class={'w-full h-1/5 bg-gray-800 flex justify-center items-center text-4xl'} onClick={handlePageFocus} >
        {content}
      </div>
    )
  }
  const handleTouchEnd = (e) => {
    endTime = new Date().getTime()
    endX = e.changedTouches[0].screenX
    let moveDistence = endX - startX
    if (endTime - startTime < 500) {
      if (moveDistence > 20) {
        prevPage()
      }
      if (moveDistence < -20) {
        nextPage()
      }
    }
  }
  const mount = (el) => {
    console.log(`el`,el);
  }
  const Book: FunctionalComponent<Props, Emit> =
    (props, ctx) => {
      const { emit } = ctx
      console.log("🚀 ~ file: book.tsx ~ line 98 ~ useBook ~ ctx", ctx.slots.default!())
      
      // let sty = JSON.parse(JSON.stringify(style))
      // Object.assign(sty, props.style)
      // let styleFather = Object.values({fdfa:'fff'})[0]
      return (
        <div class={'flex flex-col w-full h-full justify-center items-center text-slate-400 bg-gray-900'} v-getComp={(el) => { mount(el) }}>
          {renderSideClick()}
          <p class={'w-full h-full text-6xl break-all text-left pl-2 '} onTouchstart={handleTouchStart} onTouchend={handleTouchEnd}>
            {text.value}
            {ctx.slots.default && ctx.slots.default()}
          </p>
          {renderPageNum()}
        </div>
      )
    }
  return {
    Book
  }
}

export default useBook;
