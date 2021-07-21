import { CssRender } from 'css-render'
import bem from '@css-render/plugin-bem'

const c = CssRender()
const plugin = bem({
  blockPrefix: '.moon-'
})

c.use(plugin)

const { cB, cE } = plugin

const moonAvatarStyle = cB(
  'avatar',
  ({ props }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }),
  [
    cE(
      'image',
      () => ({
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        margin: '0 15px 0 25px'
      })
    ),
    cE(
      'user > p',
      () => ({
        margin: '0',
        fontFamily: 'Helvetica Neue',
        fontStyle: 'normal',
        fontWeight: 'normal',
      })
    ),
    cE(
      'user > p:first-child',
      () => ({
        fontSize: '15px',
        color: '#25233A'
      })
    ),
    cE(
      'user > p:last-child',
      () => ({
        fontSize: '12px',
        color: '#8B8C99'
      })
    ),
    cE(
      'icon',
      () => ({
        marginLeft: '15px',
        color: '#A7A9C0'
      })
    )
  ]
)

export default moonAvatarStyle
