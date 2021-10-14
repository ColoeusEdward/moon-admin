import { defineStore } from 'pinia'

type state = {
  num:number
  memPercent:[number,number]
}

export const useSocketStore = defineStore({
  id: 'socket',
  state: (): state => ({
    num:0
    ,memPercent:[1,1]
  }),
  getters: {
  },
  actions: {
    setNum(value){
      this.num = value
    }
  }
})
