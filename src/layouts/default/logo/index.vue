<template>
  <div class="moon-logo">
    <img class="moon-logo__image" :src="logo" alt="" />
    <span class="moon-logo__name">MoonAdmin</span>
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
