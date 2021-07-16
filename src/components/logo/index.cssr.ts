import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB } = plugin

const moonHeaderContainerStyle = cB(
  'logo',
  ({ props }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: props?.backgroundColor ?? '#fff',
    width: '270px',
    height: props?.height ?? '70px'
  })
)

export default moonHeaderContainerStyle
