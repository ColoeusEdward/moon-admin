const getComp = {//用于无状态组件获取子组件vnode, 接收参数为{bm:beforeMount(),m:mount(),um:unmount()} 或 mount()
  beforeMount(el, binding) {
    binding.value.bm && binding.value.bm()
  }
  , mounted(el, binding, vnode) {
    let ret = vnode
    // console.log(`vnode`,vnode);
    vnode.ref?.i.ctx && (ret = vnode.ref.i.ctx)
    if (binding.value.m) {
      binding.value.m(ret)
    } else {
      !binding.value.bm && !binding.value.um && binding.value(ret)
    }
    // 关键
  }
  , unmounted(el, binding) {
    // clearInterval(el.__vueSetInterval__);
    // binding
    binding.value.um && binding.value.um()
  }
}

export default getComp
