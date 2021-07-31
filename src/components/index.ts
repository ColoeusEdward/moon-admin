
// 把componets文件夹下的所有idnex.vue文件自动生成映射关系,不想作为全局组件注册的就不要用index作为名字
const modules = import.meta.glob('../components/**/index.vue')
const components = {}
// debugger
Object.keys(modules).forEach((key: string) => {
  const nameMatch: string[] | null = key.match(/^\.\.\/components\/(.+)\.vue/)

  if (!nameMatch) {
    return
  }
  // 统一使用父文件夹作为name
  const folderMatch: string[] | null = nameMatch[1].match(/(.*)\/Index$/i)

  let name: string = folderMatch ? folderMatch[1] : 'unname'

  ;[name] = name.split('/').splice(-1)

  components[name] = modules[key]
})

export default components
