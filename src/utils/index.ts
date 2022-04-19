import { useThemeStore } from "@/store/modules/theme"
import { Options, Position } from "./util"


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
  } catch (e: any) {
    return e instanceof Error ? e : new Error(e);
  }
};

const attempt2 = (fn: (...args: any[]) => any, ...args: any[]) => {
  try {
    return [fn(...args), null];
  } catch (e: any) {
    return [null, e instanceof Error ? e : new Error(e)];
  }
};

/**
 * Returns the relative position of the caret in the given element.
 * @param element Input (has to be type='text') or Text Area.
 */
function getRelativePosition(
  element: HTMLInputElement | HTMLTextAreaElement,
  options: Options = {
    debug: false,
    useSelectionEnd: false,
    checkWidthOverflow: true
  }
): Position {
  const selectionStart =
    element.selectionStart !== null ? element.selectionStart : 0
  const selectionEnd = element.selectionEnd !== null ? element.selectionEnd : 0
  const position = options.useSelectionEnd ? selectionEnd : selectionStart
  console.log("🚀 ~ file: index.ts ~ line 109 ~ position", position)
  // We'll copy the properties below into the mirror div.
  // Note that some browsers, such as Firefox, do not concatenate properties
  // into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
  // so we have to list every single property explicitly.
  const properties: string[] = [
    'direction', // RTL support
    'boxSizing',
    'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
    'height',
    'overflowX',
    'overflowY', // copy the scrollbar for IE
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration', // might not make a difference, but better be safe
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize'
  ]
  // Firefox 1.0+
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) {
    throw new Error(
      'textarea-caret-position#getCaretPosition should only be called in a browser'
    )
  }

  const debug = options?.debug
  if (debug) {
    const el = document.querySelector(
      '#input-textarea-caret-position-mirror-div'
    )
    if (el?.parentNode) el.parentNode.removeChild(el)
  }

  // The mirror div will replicate the textareas style
  const div = document.createElement('div')
  div.id = 'input-textarea-caret-position-mirror-div'
  document.body.appendChild(div)

  const style = div.style
  const computed = window.getComputedStyle
    ? window.getComputedStyle(element)
    : (element as any).currentStyle // currentStyle for IE < 9

  const isInput = element.nodeName === 'INPUT'

  // Default textarea styles
  style.whiteSpace = isInput ? 'nowrap' : 'pre-wrap'
  if (!isInput) style.wordWrap = 'break-word' // only for textarea-s

  // Position off-screen
  style.position = 'absolute' // required to return coordinates properly
  if (!debug) style.visibility = 'hidden' // not 'display: none' because we want rendering

  // Transfer the element's properties to the div
  properties.forEach((prop) => {
    if (isInput && prop === 'lineHeight') {
      // Special case for <input>s because text is rendered centered and line height may be != height
      if (computed.boxSizing === 'border-box') {
        const height = parseInt(computed.height)
        const outerHeight =
          parseInt(computed.paddingTop) +
          parseInt(computed.paddingBottom) +
          parseInt(computed.borderTopWidth) +
          parseInt(computed.borderBottomWidth)
        const targetHeight = outerHeight + parseInt(computed.lineHeight)
        if (height > targetHeight) {
          style.lineHeight = `${height - outerHeight}px`
        } else if (height === targetHeight) {
          style.lineHeight = computed.lineHeight
        } else {
          style.lineHeight = '0'
        }
      } else {
        style.lineHeight = computed.height
      }
    } else {
      style[prop as any] = computed[prop]
    }
  })

  if (isFirefox) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > parseInt(computed.height)) {
      style.overflowY = 'scroll'
    }
  } else {
    style.overflow = 'hidden' // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  div.textContent = element.value.substring(0, position)
  // The second special handling for input type="text" vs textarea:
  // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
  if (isInput && div.textContent) {
    div.textContent = div.textContent.replace(/\s/g, '\u00a0')
  }

  const span = document.createElement('span')
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textareas content into the <span> created at the caret position.
  // For inputs, just '.' would be enough, but no need to bother.
  span.textContent = element.value.substring(position) || '.' // || because a completely empty faux span doesn't render at all
  span.style.position = 'relative'
  span.style.left = `${-element.scrollLeft}px`
  span.style.top = `${-element.scrollTop}px`
  div.appendChild(span)

  const relativePosition = {
    top: span.offsetTop + parseInt(computed.borderTopWidth),
    left: span.offsetLeft + parseInt(computed.borderLeftWidth),
    absolute: false,
    // We don't use line-height since it may be too large for position. Eg. 34px
    // for input
    height: parseInt(computed.fontSize) * 1.5
  }

  if (debug) {
    span.style.backgroundColor = '#aaa'
  } else {
    document.body.removeChild(div)
  }

  if (
    relativePosition.left >= element.clientWidth &&
    options.checkWidthOverflow
  ) {
    relativePosition.left = element.clientWidth
  }
  return relativePosition
}

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
  , getRelativePosition
}