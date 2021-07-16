import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB, cE } = plugin

const moonLogoStyle = cB(
  'logo',
  ({ props }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    width: props?.width ??'229px',
    height: props?.height ?? '70px',
    backgroundColor: props?.backgroundColor ?? '#fff',
    borderRight: '1px solid #E7E8F2',
    overflow: 'hidden'
  }),
  [
    cE(
      'image',
      () => ({
        height: '30px'
      })
    ),
    cE(
      'name',
      () => ({
        fontFamily: 'Helvetica Neue',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#25233A'
      })
    )
  ]
)

export default moonLogoStyle
