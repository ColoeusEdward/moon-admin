<template>
  <header class="container">
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
<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MoonHeader'
  })
</script>
