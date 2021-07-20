/**
 * 读取modules里边
 */

import { GlobalThemeOverrides } from 'naive-ui'

const files = import.meta.globEager('./modules/*.ts')
const themeModules: { [key: string]: GlobalThemeOverrides } = {}
Object.keys(files).forEach((path) => {
  const fileName = path.split('/')[2]
  themeModules[fileName.replace(/(\.\/|\.ts)/g, '')] = files[path].default
})

export default themeModules
