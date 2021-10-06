import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB, cE } = plugin

const testJsxStyle = cB(
  'testjsx',
  ({ props }) => ({
    width: '100%',
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
    ,cE(
      'fuck',
      () => ({
        color:'blue'
      })
    )
    ,cE(
      'test',
      () => ({
        color:'blue'
      })
    )
  ]
)
// testJsxStyle.mount()

export default testJsxStyle
