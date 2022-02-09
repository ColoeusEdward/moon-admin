import { debounce } from "@/utils"
const watchSize = { //监听元素尺寸变化
  mounted(el, binding) {
    const cbFn = (sizeOb) => {
      binding.value && binding.value(sizeOb)
    }
    el._resizer = new window.ResizeObserver(debounce(cbFn, Number(binding.arg) || 16))
    el._resizer.observe(el)
  },
  unmounted(el) {
    el._resizer.disconnect()
  },
}

export default watchSize
