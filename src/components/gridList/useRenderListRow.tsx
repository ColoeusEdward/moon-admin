import { record_free, rmFile, deploy, uploadTemp } from "@/apis"
import {CopyOne,Delete} from '@icon-park/vue-next'
import { NIcon } from 'naive-ui'
import useStyle from "./useStyle"
import style from './index.module.scss'
import { isLongPress } from "@/utils"
const styleHook = useStyle()

export default function useRenderListRow() {
  const handleListRowClick = async (name) => {
    if (name.length == 2) {
      name = name[1]
    }
    const clipboardObj = navigator.clipboard
    await clipboardObj.writeText(name)
    window.$msg!.success('复制成功')
  }
  const renderCon = (renderFn, e) => {
    return (
      <div class={style.listRow} onMouseup={(event) => { event.stopPropagation(); !isLongPress() && handleListRowClick(e) }} >
        {renderFn(e)}
        <NIcon size="30">
          <CopyOne />
        </NIcon>
      </div>
    )
  }
  const typeObj = {
    '查看文件大小': (e) => {
      return (
        <div class={[style.name, style.sizeName]} style="text-align:left;">
          <div style="color:blue;">{e[0]}</div>
          <span>{e[1]}</span>
        </div>
      )
    }
    , '查看剩余空间': (e) => {
      return <div class={style.name} style={styleHook.listRowNameStyle(e)} >{ e }</div>
    }
  }
  const render = (item) => {
    return item.list.map(e => {
      return renderCon(typeObj[item.text], e)
    })
  }

  return {
    render
  }
}



