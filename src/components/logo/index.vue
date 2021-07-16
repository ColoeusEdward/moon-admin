<template>
  <div class="moon-logo">
    <slot name="logo">
      <img :src="logo" alt="">
      <span>{{ name }}</span>
    </slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import Logo from '@/assets/images/logo.png'

  const props = {
    logo: {
      type: String as PropType<string>,
      default: Logo
    },
    name: {
      type: String as PropType<string>,
      default: 'MoonAdmin'
    }
  }

  export default defineComponent({
    name: 'MoonLogo',
    props,
    setup() {

    }
  })
</script>
