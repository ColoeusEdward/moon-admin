<template>
  <n-config-provider :theme-overrides="defaultTheme" class="moon-layout-theme-config">
    <n-layout class="moon-layout-container">
      <n-layout-header>
        <moon-header-container />
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 71px">
        <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="270" :native-scrollbar="false" @collapse="collapsed = true" @expand="collapsed = false " :collapsed="collapsed">
          <moon-sider />
        </n-layout-sider>
        <n-layout-content>
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
//组件引入
import MoonHeaderContainer from '@/layouts/default/header/index.vue'
import MoonSider from '@/layouts/default/sider/index.vue'
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutSider, NLayoutContent, useMessage, useDialog } from 'naive-ui'
import { useThemeStore } from '@/store/modules/theme'
const dialog = useDialog()
const themeStore = useThemeStore()
themeStore.setDialog(dialog)

const defaultTheme = {}
let collapsed = ref(true)
provide('collapsed', collapsed)
// defaultTheme.value = darkTheme
window.$msg = useMessage()
// console.log("window.$msg", window.$msg)
</script>
<style lang="scss" scoped>
.moon-layout-theme-config {
  height: 100%;
  position: relative;
  .moon-layout-container {
    min-height: 100%;
  }
}
</style>
