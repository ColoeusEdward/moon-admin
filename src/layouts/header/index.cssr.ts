import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.header-'
})

c.use(plugin)

const { cB, cE } = plugin

const style = cB(
  'container',
  () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  }),
  [
    cE(
      'left',
      {}
    ),
    cE(
      'center',
      {}
    ),
    cE(
      'right',
      {}
    )
  ]
)
