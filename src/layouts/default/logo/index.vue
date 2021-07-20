<template>
  <div class="moon-logo">
    <slot name="logo">
      <img class="moon-logo__image" :src="logo" alt="" />
      <span class="moon-logo__name">MoonAdmin</span>
    </slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import Logo from '@/assets/images/logo.png'
  import moonLogoStyle from '@/layouts/default/logo/index.cssr'

  export default defineComponent({
    name: 'MoonLogo',
    setup() {
      moonLogoStyle.mount()

      return {
        logo: Logo
      }
    }
  })
</script>
