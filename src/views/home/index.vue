<template>
  <n-space>
    <n-button @click="changeTheme">切换主题</n-button>
  </n-space>
</template>
<script lang="ts" setup>
  import { NSpace, NButton } from 'naive-ui'
  import { useThemeStore } from '@/store/modules/theme'

  const themeStore = useThemeStore()

  // 切换默认主题
  const changeTheme = () => {
    themeStore.darkTheme = !themeStore.darkTheme
  }
</script>
