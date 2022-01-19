
export default function useBookPermission (router) {
  const whiteList = ['/login']
  router.beforeEach(async (to, from, next) => {
    next()
    // // themeStore.loadingBar && themeStore.loadingBar.start()

    // const hasToken = userStore.token
    // console.log({to});
    // if(whiteList.indexOf(to.fullPath)>-1){
    //   next()
    //   return
    // }
    // if (hasToken) {
      
    // } else {
    //   next({
    //     path: '/login'
    //   })
    // }
    // themeStore.loadingBar && themeStore.loadingBar.finish()
  })
}
// const themeStore = useThemeStore()
