import { defineStore } from 'pinia'

type state = {
  num:number
}

export const useChildStore = defineStore({
  id: 'child',
  state: (): state => ({
    num:0
  }),
  getters: {
  },
  actions: {
    setNum(value){
      this.num = value
    }
  }
})
