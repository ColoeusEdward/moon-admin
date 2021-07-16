<template>
  <header class="moon-header-container">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="center">
      <slot name="center" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </header>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import moonHeaderContainerStyle from '@/layouts/header/index.cssr'
  import MoonHeaderContainerStyle from '@/layouts/header/type'

  const props = {
    style: Object as PropType<MoonHeaderContainerStyle>
  }

  export default defineComponent({
    name: 'MoonHeaderContainer',
    props,
    setup(props) {
      const initStyle = (): void => {
        const { height, backgroundColor } =  props?.style as MoonHeaderContainerStyle

        moonHeaderContainerStyle.mount({
          props: {
            height: typeof height === 'number' ? height + 'px' : height,
            backgroundColor
          }
        })
      }

      initStyle()
    }
  })
</script>
