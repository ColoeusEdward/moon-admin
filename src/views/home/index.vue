<template>
  <div class="main">
    这里是首页
    <n-space>
      <n-button @click="handleSettingDrawer">drawer</n-button>
    </n-space>
    <moon-setting-drawer :show-setting-drawer="showSettingDrawer"></moon-setting-drawer>
    <moon-card></moon-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { NSpace, NButton } from 'naive-ui'
  import MoonSettingDrawer from '@/views/drawer/index.vue'
  import MoonCard from '@/components/card/index.vue'

  const showSettingDrawer = ref(false)
  const handleSettingDrawer = () => {
    showSettingDrawer.value = !showSettingDrawer.value
  }
</script>

<style scoped></style>
