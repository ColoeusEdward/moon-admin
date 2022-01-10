import { isLongPress } from '@/utils';
import { useToolTip } from '@/utils/comp';
import { Refresh } from '@icon-park/vue-next';
import { NIcon } from 'naive-ui';
import style from '../dashIndex.module.scss'
// import { } from 'vue'

const contentRender = (item,size?) => {
  return (
    <NIcon size={size || '80'}>
      {item.iconComp()}
    </NIcon>
  )
}
const toolTip = useToolTip()
const recoverGridItem =
  (item, recoverFn,size?) => {
    return (
      <div class={style.recoverSize} onMouseup={() => { !isLongPress() && recoverFn() }}>
        {toolTip.render(contentRender(item,size), item.text)}
      </div>
    )
  }
export default recoverGridItem;