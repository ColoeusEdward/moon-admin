import { useLoadingBar,LoadingBarProviderInst } from 'naive-ui'

import { defineStore } from 'pinia'

interface themeListState {
  //深色主题
  darkTheme: boolean
  loadingBar?: LoadingBarProviderInst
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): themeListState => ({
    darkTheme: true
  }),
  getters: {
    getTheme(): boolean {
      return this.darkTheme
    }
  },
  actions: {
    setLoadingBar(bar){
      console.log({bar});
      this.loadingBar = bar
    }
  }
})
