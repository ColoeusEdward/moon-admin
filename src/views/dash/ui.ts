import { getRandomIntInclusive, shuffle } from "@/utils";
import define from "@/utils/define";
const colorList = [`#ffb900`, `#ff8c00`, '#f7630c', '#ca5010', '#da3b01', '#ef6950', '#d13438', '#ff4343', '#e81123', '#c30052', '#e3008c', '#bf0077', '#c239b3', '#9a0089', '#0078d7', '#0063b1', '#8e8cd8', '#6b69d6', '#8764b8', '#744da9', '#881798', '#0099bc', '#2d7d9a', '#00b7c3', '#038387', '#00b294', '#018574', '#00cc6a']

export default function ui() {
  const randomStickerColor = () => {
    let idx = getRandomIntInclusive(2, colorList.length-1)
    let item = colorList.splice(idx,1)[0]
    colorList.unshift(item)
    let res = `linear-gradient(to right, ${colorList[0]}E6, ${colorList[1]}E6),url(${define.root}arris.svg) repeat 50%`
    return res
    // let slist = shuffle(colorList)
    // let res = `linear-gradient(to right, ${slist[0]}, ${slist[1]})`
    // return res
  }
  const setLayoutColor = (layout) => {
    layout.forEach((e) => {
      e.bg = randomStickerColor()
    })
  }
  const gridItemStyle = (item) => {
    let style = {
      background: item.bg
      // , border: `1px solid ${item.bgColor}`
    }

    return style
  }

  const aniControl = (item, btnIdx) => {//动画控制
    if (item.i == btnIdx.value) {
      return 'active'
    }
    return ''
  }

  const controlGridItemSize = (i, layout, gridLayout) => {
    console.log('control', i)
    let item = layout.find((e) => {
      return e.i == i
    })
    // item.y = 7
    let temp = (fn) => {
      item.w = 4
      item.h = 18
      item.expend = true
      fn && fn(item)
      return true
    }
    let list: any[] = []
    list[6] = list[8] = list[22] = temp
    list[7] = () => {
      item.w = 4
      item.h = 6
      item.expend = true
      return true
    }
    list[4] = () => {
      item.w = 4
      item.h = 7
      item.expend = true
      return true
    }
    list[3] = list[4]
    // list[14] = () => {
    //   let item = layout.find((e) => {
    //     return e.i == i
    //   })
    //   item.w = 4
    //   item.h = 7
    //   item.expend = true
    //   return true
    // }
    list[i] && list[i]() && gridLayout.value?.layoutUpdate()
    // console.log(`layout`,layout);
    // list[i] && list[i]() && gridLayout.layoutUpdate()
  }




  return {
    randomStickerColor
    , setLayoutColor
    , gridItemStyle
    , controlGridItemSize
    , aniControl
  }
}