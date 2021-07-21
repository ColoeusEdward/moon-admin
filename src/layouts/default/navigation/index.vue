<template>
  <div class="moon-navigation">
    <div class="moon-navigation__path">Overview</div>
    <div class="moon-navigation__userinfo">
      <moon-operating />
      <moon-avatar />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MoonAvatar from '@/layouts/default/avatar/index.vue'
  import MoonOperating from '@/layouts/default/operating/index.vue'
  import moonNavigationStyle from '@/layouts/default/navigation/index.cssr'

  export default defineComponent({
    name: 'MoonNavigation',
    components: { MoonAvatar, MoonOperating },
    setup() {
      moonNavigationStyle.mount()
    }
  })
</script>
