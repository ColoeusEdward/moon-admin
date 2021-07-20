import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB } = plugin

const moonHeaderContainerStyle = cB(
  'header',
  ({ props }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '70px',
    borderBottom: '1px solid var(--border-color)',
    overflow: 'hidden'
  })
)

export default moonHeaderContainerStyle
