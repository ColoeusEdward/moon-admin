
import { useUserStore } from "./store/modules/user";

export default function usePermission (router) {
  console.log({ router });
  const whiteList = ['/login']
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    // themeStore.loadingBar && themeStore.loadingBar.start()

    const hasToken = userStore.token
    console.log({to});
    if(whiteList.indexOf(to.fullPath)>-1){
      next()
      return
    }
    if (hasToken) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
    // themeStore.loadingBar && themeStore.loadingBar.finish()
  })
}
// const themeStore = useThemeStore()
