<template>
  <n-config-provider style="width: 100%; height: 100%">
    <router-view></router-view>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { NConfigProvider, darkTheme } from 'naive-ui'
  import { useThemeStore } from '@/store/modules/theme'

  const themeStore = useThemeStore()
  const getTheme = computed(() => (themeStore.darkTheme ? darkTheme : undefined))
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
</style>
