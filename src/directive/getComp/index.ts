const getComp = {//用于无状态组件获取子组件vnode
  beforeMount(el, binding) {

  }
  , mounted(el, binding) {
    let ret = el
    el.__vnode?.ref?.i.ctx && (ret = el.__vnode.ref.i.ctx)
    binding && binding.value(ret);    // 关键
  }
  , unmounted(el) {
    // clearInterval(el.__vueSetInterval__);
  }
}

export default getComp
