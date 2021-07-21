<template>
  <header class="moon-header">
    <moon-logo />
    <moon-navigation />
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MoonLogo from '@/layouts/default/logo/index.vue'
  import MoonNavigation from '@/layouts/default/navigation/index.vue'
  import moonHeaderContainerStyle from '@/layouts/default/header/index.cssr'

  export default defineComponent({
    name: 'MoonHeader',
    components: {
      MoonLogo,
      MoonNavigation
    },
    setup() {
      moonHeaderContainerStyle.mount()
    }
  })
</script>
