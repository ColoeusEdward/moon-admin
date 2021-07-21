<template>
  <div class="moon-card">
    <header class="moon-card__header">
      <h3>{{ title }}</h3>
    </header>
    <slot>
      <p>内容插槽</p>
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import moonCardStyle from '@/components/card/index.cssr'

  const props = {
    title: {
      type: String as PropType<string>,
      default: 'card-title'
    }
  }

  export default defineComponent({
    name: 'MoonCard',
    props,
    setup() {
      moonCardStyle.mount()
    }
  })
</script>
