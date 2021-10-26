import { useLoadingBar, LoadingBarProviderInst, useDialog } from 'naive-ui'

import { defineStore } from 'pinia'

interface themeListState {
  //深色主题
  darkTheme: boolean
  loadingBar?: LoadingBarProviderInst
  pressTime?: number
  dialog?: ReturnType<typeof useDialog>
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): themeListState => ({
    darkTheme: true
    , pressTime: new Date().getTime()
  }),
  getters: {
    getTheme(): boolean {
      return this.darkTheme
    }
  },
  actions: {
    setLoadingBar(bar) {
      console.log({ bar });
      this.loadingBar = bar
    }
    , setPressTime(val) {
      this.pressTime = val
    }
    , setDialog(val) {
      this.dialog = val
    }
  }
})
