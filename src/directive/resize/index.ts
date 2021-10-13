const resize = {
  beforeMount(el, binding) {
    let width = '0', height = '0'
    console.log({el});
    console.log(`resize Start`,);
    function isResize() {
      const style = document?.defaultView?.getComputedStyle(el);
      if (width !== style!.width || height !== style!.height) {
        console.log(`resize`,);
        binding && binding.value();  // 关键
      }
      width = style!.width;
      height = style!.height;
      
    }
    el.__vueSetInterval__ = setInterval(isResize, 300);
  }
  , unmounted(el) {
    clearInterval(el.__vueSetInterval__);
  }
}

export default resize
