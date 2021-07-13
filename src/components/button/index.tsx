import { defineComponent, PropType } from 'vue'
import { NIcon } from 'naive-ui'
import AngleRight from '@vicons/fa/AngleRight'

const selectOptions = {
  text: [String, Number] as PropType<string | number> // 按钮文本
}

const MoonButton = defineComponent({
  name: 'MoonButton',
  props: selectOptions,
  render() {
    const { text } = this

    return <button id='moon-button-container'>
      <span>{ text }</span>
      <NIcon>
        <AngleRight />
      </NIcon>
    </button>
  }
})

export default MoonButton
