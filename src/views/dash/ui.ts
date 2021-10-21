
export default function ui() {
  const randomStickerColor = () => {
    // let colorList = ['#b2103e', '#339933', '#1BA1E2', '#F09609', '#8CBF26', '#1BA1E2', '#00ABA9', '#be3223', '#E671B8']
    let colorList = [`#ffb900`,`#ff8c00`,'#f7630c','#ca5010','#da3b01','#ef6950','#d13438','#ff4343','#e81123','#c30052','#e3008c','#bf0077','#c239b3','#9a0089','#0078d7','#0063b1','#8e8cd8','#6b69d6','#8764b8','#744da9','#881798','#0099bc','#2d7d9a','#00b7c3','#038387','#00b294','#018574','#00cc6a']
    let index = Math.floor((Math.random() * colorList.length));
    return colorList[index]
  }
  const setLayoutColor = (layout) => {
    layout.forEach((e) => {
      e.bgColor = randomStickerColor()
    })
  }
  const gridItemStyle = (item) => {
    let style = {
      backgroundColor: item.bgColor
      // , border: `1px solid ${item.bgColor}`
    }
    return style
  }

  const controlGridItemSize = (i, layout, gridLayout) => {
    console.log('control', i)
    let temp = (fn) => {
      let item = layout.find((e) => {
        return e.i == i
      })
      item.w = 4
      item.h = 18
      fn && fn(item)
      return true
    }
    let list: any[] = []
    list[6] = list[8] = temp
    list[7] = () => {
      let item = layout.find((e) => {
        return e.i == i
      })
      item.w = 4
      item.h = 6
      item.expend = true
      return true
    }
    list[4] = () => {
      let item = layout.find((e) => {
        return e.i == i
      })
      item.w = 4
      item.h = 7
      item.expend = true
      return true
    }
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
  }

  const listTitleStyle = (item) => {
    let style = {
      borderBottom: '',
      marginTop: '',
    }
    if (item.list) {
      // style.marginTop = "10px";
      style.borderBottom = '1px solid #fff'
    } else {
      // style.marginTop = '20%'
    }
    return style
  }

  const listRowNameStyle = (le) => {
    let style = {
      color: ''
    }
    if (le.search('32G') != -1) {
      style.color = 'blue'
    }
    return style
  }



  return {
    randomStickerColor
    , setLayoutColor
    , gridItemStyle
    , controlGridItemSize
    , listTitleStyle
    , listRowNameStyle
  }
}