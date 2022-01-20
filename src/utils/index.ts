import { useThemeStore } from "@/store/modules/theme"


const sleep = (ms) => {
  return new Promise((reslove) => {
    setTimeout(reslove, ms)
  })
}

const isLongPress = () => {
  const themeStore = useThemeStore()
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

const numToChinese = (num) => {
  var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
  return chnNumChar[num]
}
// const shuffle = (array) => { //数组洗牌
//   let currentIndex = array.length, randomIndex;
//   // While there remain elements to shuffle...
//   while (currentIndex != 0) {
//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex], array[currentIndex]];
//   }
//   return array;
// }

const shuffle = (array) => { //数组洗牌
  array.sort(() => 0.5 - Math.random());
  return array;
}

const getRandomIntInclusive = (min, max) => { //得到一个两数之间的随机整数，包括两个数在内
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

const firstCap = (str:string) => { //首字母大写
  return str.replace(/^\S/, s => s.toUpperCase())
} 


export {
  sleep
  , isLongPress
  , copyToPaste
  , shuffle
  , numToChinese
  , getRandomIntInclusive
  , firstCap
}