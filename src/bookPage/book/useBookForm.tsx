
import { getExistBook } from "@/apis"
import useMyFormWarp from "@/components/myFormWarp/useMyFormWarp"
import { NModal } from "naive-ui"
import { reactive,ref } from "vue"


const useBookForm = () => {
  const { MyFormWarp } = useMyFormWarp()
  const form: { book?: string } = reactive({})
  const modalShow = ref(false)
  const formItemList = reactive([
    { prop: 'book', type: 'select', label: '当前书籍', width: 23, rule: 'must' }
  ])
  const optionMap = reactive({
    book: [] as Object[]
  })
  const getBook = async () => {
    let data = await getExistBook()
    let opt = data.map(e => {
      return { label: e, value: e }
    })
    optionMap.book = opt
  }
  const submit = () => {
    console.log(`form`, form);
    window.$socket?.emit('changeBook', form.book)
    modalShow.value = false
  }

  const renderBookForm = () => {
    return (
      <NModal v-model:show={modalShow.value} preset="card" title="选择" style={{ width: '500px' }}>
        <MyFormWarp form={form} itemList={formItemList} optionMap={optionMap} submitFn={submit} />
      </NModal>
    )
  }
  return {
    renderBookForm
    , getBook
    , modalShow
  }
}

export default useBookForm