import { defineStore } from 'pinia'

type state = {
  token:string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): state => ({
    token:localStorage.getItem('token')||``
  }),
  getters: {
  },
  actions: {
    setToken(value){
      this.token = value
      localStorage.setItem('token',value)
    }
  }
})
