import { firstCap } from '@/utils'
import { defineStore } from 'pinia'

type state = {
  content: string
  page: number
}
export const useBookStore = defineStore({
  id: 'book',
  state: (): state => ({
    content: '6666666666666'
    , page: 0
  }),
  getters: {

  },
  actions: {
    setContent(val) {
      this.content = val
    }
    , setPage(val) {
      this.page = val
    }
  }
})
