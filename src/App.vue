<template>
  <n-config-provider style="width: 100%; height: 100%;" :theme="getTheme">
    <n-message-provider>
      <n-dialog-provider>
        <router-view></router-view>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NConfigProvider, darkTheme, NMessageProvider, NDialogProvider } from 'naive-ui'
import { useThemeStore } from '@/store/modules/theme'
import usePermission from './permission'
import { useRouter } from 'vue-router'

const router = useRouter()
usePermission(router)
// const loadingBar = useLoadingBar()
const themeStore = useThemeStore()
// themeStore.setLoadingBar(loadingBar)
const getTheme = computed(() => (themeStore.darkTheme ? darkTheme : undefined))
  // const getTheme = darkTheme
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
