import { isLongPress } from '@/utils';
import { useToolTip } from '@/utils/comp';
import { NIcon } from 'naive-ui';
import style from '../dashIndex.module.scss'
// import { } from 'vue'

const contentRender = (item) => {
  return (
    <NIcon size="80">
      {item.iconComp.render()}
    </NIcon>
  )
}
const toolTip = useToolTip()
const recoverGridItem =
  (item,recoverFn) => {
    return (
      <div class={style.recoverSize} onMouseup={()=>{!isLongPress()&&recoverFn()}}>
        {toolTip.render(contentRender(item), item.text)}
      </div>
    )
  }
export default recoverGridItem;