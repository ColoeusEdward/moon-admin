import { defineStore } from 'pinia'
interface themeListState {
  //深色主题
  darkTheme: boolean
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
  actions: {}
})
