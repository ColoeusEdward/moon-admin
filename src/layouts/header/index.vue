<template>
  <header class="moon-header-container">
    <moon-logo />
<!--    <div class="navigation">-->
<!--      <slot name="navigation" />-->
<!--    </div>-->
  </header>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import MoonLogo from '@/components/logo/index.vue'
  import moonHeaderContainerStyle from '@/layouts/header/index.cssr'
  import MoonHeaderContainerStyle from '@/layouts/header/type'

  const props = {
    style: Object as PropType<MoonHeaderContainerStyle>
  }

  export default defineComponent({
    name: 'MoonHeaderContainer',
    props,
    components: {
      MoonLogo
    },
    setup(props) {
      const initStyle = (): void => {
        const { height, backgroundColor } = props?.style as MoonHeaderContainerStyle

        console.log(height)

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
