import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB, cE } = plugin

const moonNavigationStyle = cB(
  'navigation',
  ({ props }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'calc(100% - 330px)',
    padding: '0 30px',
    cursor: 'pointer'
  }),
  [
    cE(
      'path',
      () => ({
        fontFamily: 'Helvetica Neue',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '16px',
        color: '#eee'
      })
    ),
    cE(
      'userinfo',
      () => ({
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      })
    )
  ]
)

export default moonNavigationStyle
