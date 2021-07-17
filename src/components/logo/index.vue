<template>
  <div class="moon-logo">
    <slot name="logo">
      <img class="moon-logo__image" :src="logoImage" alt="" />
      <span class="moon-logo__name">{{ logoName }}</span>
    </slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import Logo from '@/assets/images/logo.png'
  import moonLogoStyle from '@/components/logo/index.cssr'
  import { MoonLogoStyle } from 'types/style'

  const props = {
    logoImage: {
      type: String as PropType<string>,
      default: Logo
    },
    logoName: {
      type: String as PropType<string>,
      default: 'MoonAdmin'
    },
    logoStyle: Object as PropType<MoonLogoStyle>
  }

  export default defineComponent({
    name: 'MoonLogo',
    props,
    setup(props) {
      const initStyle = (): void => {
        const style: MoonLogoStyle = props?.logoStyle

        if (!style) {
          moonLogoStyle.mount()
        } else {
          const { height, width, backgroundColor } = style

          moonLogoStyle.mount({
            props: {
              height: typeof height === 'number' ? height + 'px' : height,
              width: typeof width === 'number' ? width + 'px' : width,
              backgroundColor
            }
          })
        }
      }

      initStyle()
    }
  })
</script>
