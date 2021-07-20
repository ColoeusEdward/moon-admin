import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB, cE } = plugin

const moonSiderStyle = cB(
  'sider-container',
  ({ props }) => ({
    width: props?.width ?? '269px',
    height: '100%',
    borderRight: '1px solid #E7E8F2'
  })
)

export default moonSiderStyle
