import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB, cE } = plugin

const moonCardStyle = cB(
  'card',
  ({ props }) => ({
    width: '100%',
    border: '1px solid #E7E8F2',
    borderRadius: '6px'
  }),
  [
    cE(
      'header',
      () => ({
        padding: '0 20px',
        height: '45px',
        lineHeight: '45px',
        borderBottom: '1px solid #E7E8F2'
      })
    ),
    cE(
      'header > h3',
      () => ({
        margin: 0,
        fontFamily: 'Helvetica Neue',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        textAlign: 'left',
        color: '#01058A'
      })
    )
  ]
)

export default moonCardStyle
