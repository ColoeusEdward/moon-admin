<template>
  <div class="mian" style="background-color: aliceblue">
    这里是首页
    <moon-card />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MoonCard from '@/components/card/index.vue'

export default defineComponent({
  components: {
    MoonCard
  }
})
</script>
