import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB } = plugin

const moonHeaderContainerStyle = cB(
  'header-container',
  ({ props }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: props?.backgroundColor ?? '#fff',
    width: '100%',
    height: props?.height ?? '70px'
  })
)

export default moonHeaderContainerStyle
