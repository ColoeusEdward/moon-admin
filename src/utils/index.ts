import { useThemeStore } from "@/store/modules/theme"

const themeStore = useThemeStore()
const sleep = (ms) => {
  return new Promise((reslove) => {
    setTimeout(reslove, ms)
  })
}

const isLongPress = () => {
  let ret = false
  let time = new Date().getTime()
  let oldTime = themeStore.pressTime!
  // console.log(`time - oldTime`,(time - oldTime));
  if (time - oldTime > 200) {
    ret = true
  }
  return ret
}

const copyToPaste = async (text) => {
  const clipboardObj = navigator.clipboard
  await clipboardObj.writeText(text)
  window.$msg!.success('复制成功')
}

export {
  sleep
  , isLongPress
  , copyToPaste
}