import { defineStore } from 'pinia'
import themeSetting from '@/settings/theme'

const { darkTheme, themeList } = themeSetting

interface themeListState {
  //深色主题
  darkTheme: boolean
  //主题色列表
  themeList: string[]
}

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): themeListState => ({
    darkTheme,
    themeList
  }),
  getters: {
    getTheme(): boolean {
      return this.darkTheme
    },
    getThemeList(): string[] {
      return this.themeList
    }
  },
  actions: {}
})
