/**
 * 读取modules里边
 */
type ThemeOverrideConfig<T> = {
  [key: string]: T
}

const files = import.meta.globEager('./modules/*.ts')
const themeModules: { [key: string]: ThemeOverrideConfig<unknown> } = {}
Object.keys(files).forEach((path) => {
  const fileName = path.split('/')[2]
  themeModules[fileName.replace(/(\.\/|\.ts)/g, '')] = files[path].default
})

export default themeModules
