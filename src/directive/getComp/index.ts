const getComp = {//用于无状态组件获取子组件vnode, 接收参数为[mount(),unmount()] 或 mount()
  beforeMount(el, binding) {

  }
  , mounted(el, binding, vnode) {
    let ret = vnode
    // console.log(`vnode`,vnode);
    vnode.ref?.i.ctx && (ret = vnode.ref.i.ctx)
    if (binding.value.length === 2) {
      binding.value[0](ret)
    } else {
      binding.value(ret)
    }
    // 关键
  }
  , unmounted(el, binding) {
    // clearInterval(el.__vueSetInterval__);
    // binding
    if (binding.value.length === 2) {
      binding.value[1]()
    }
  }
}

export default getComp
