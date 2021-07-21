import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB, cE } = plugin

const moonOperatingStyle = cB(
  'operating',
  ({ props }) => ({
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'center',
    height: '70px'
  }),
  [
    cE(
      'icon',
      () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70px',
        height: 'inherit',
        color: '#A7A9C0',
        borderRight: '1px solid var(--border-color)'
      })
    ),
    cE(
      'setting',
      () => ({
        borderLeft: '1px solid var(--border-color)'
      })
    )
  ]
)

export default moonOperatingStyle
