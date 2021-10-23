import { defineStore } from 'pinia'

type state = {
  num:number
  memPercent:[number,number]
  time:number
  totalTime:number
}

export const useSocketStore = defineStore({
  id: 'socket',
  state: (): state => ({
    num:0
    ,memPercent:[1,1]
    ,time:0
    ,totalTime:28800000
  }),
  getters: {
    
  },
  actions: {
    setNum(value){
      this.num = value
    }
    ,setMemPercent(value){
      this.memPercent =value
    }
    ,setTime(val){
      this.time = val
    }
    ,setTotalTime(val){
      this.totalTime = val
    }
  }
})
