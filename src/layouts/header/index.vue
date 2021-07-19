<template>
  <header class="moon-header-container">
    <moon-logo :logo-image="logoImage" :logo-name="logoName" :logo-style="logoStyle" />
  </header>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import MoonLogo from '@/components/logo/index.vue'
  import moonHeaderContainerStyle from '@/layouts/header/index.cssr'
  import { MoonHeaderContainerStyle, MoonLogoStyle } from 'types/style'

  const props = {
    style: Object as PropType<MoonHeaderContainerStyle>,
    logoStyle: Object as PropType<MoonLogoStyle>,
    logoImage: String as PropType<string>,
    logoName: String as PropType<string>
  }

  export default defineComponent({
    name: 'MoonHeaderContainer',
    components: {
      MoonLogo
    },
    props,
    setup(props) {
      const initStyle = (): void => {
        const style: MoonHeaderContainerStyle = props?.style

        if (!style) {
          moonHeaderContainerStyle.mount()
        } else {
          const { height, backgroundColor } = style

          moonHeaderContainerStyle.mount({
            props: {
              height: typeof height === 'number' ? height + 'px' : height,
              backgroundColor
            }
          })
        }
      }

      initStyle()
    }
  })
</script>
