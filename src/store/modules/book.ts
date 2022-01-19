import { firstCap } from '@/utils'
import { defineStore } from 'pinia'

type state = {
  content: string
}
export const useBookStore = defineStore({
  id: 'book',
  state: (): state => ({
    content: ''
  }),
  getters: {

  },
  actions: {
    setContent(val){
      this.content = val
    }
  }
})
