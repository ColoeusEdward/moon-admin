import { defineComponent, PropType } from 'vue'

const selectOptions = {
  text: String as PropType<string> // 按钮文本
}

const MoonButton = defineComponent({
  name: 'MoonButton',
  props: selectOptions,
  setup() {
    return {}
  },
  render() {
    return <div class={'12'}></div>
  }
})

export default MoonButton
