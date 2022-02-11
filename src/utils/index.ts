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
  var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
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

const firstCap = (str: string) => { //首字母大写
  return str.replace(/^\S/, s => s.toUpperCase())
}

const debounce = (fn: Function, ms = 16) => {
  // 这里使用debounce防抖处理，防抖的延时时间可以通过自定义指令的参数传过来，如`v-resize:300`表示300ms延时
  // 也可以将此处延时去掉，放在绑定的函数中自定义
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const all = <T = any>(arr: T[], fn: (t: T) => boolean = Boolean) =>
  arr.every(fn);

// const atob = (str) => Buffer.from(str, "base64").toString("binary"); //解码base64字符串

const attempt = (fn: (...args: any[]) => any, ...args: any[]) => {   //尝试运行并捕获错误
  try {
    return fn(...args);
  } catch (e:any) {
    return e instanceof Error ? e : new Error(e);
  }
};

const attempt2 = (fn: (...args: any[]) => any, ...args: any[]) => {
  try {
    return [fn(...args), null];
  } catch (e:any) {
    return [null, e instanceof Error ? e : new Error(e)];
  }
};

export {
  sleep
  , isLongPress
  , copyToPaste
  , shuffle
  , numToChinese
  , getRandomIntInclusive
  , firstCap
  , debounce
  , all
  , attempt
  , attempt2
}