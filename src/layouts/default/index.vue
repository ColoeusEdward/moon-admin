<template>
  <n-config-provider :theme-overrides="defaultTheme" class="moon-layout-theme-config">
    <n-layout class="moon-layout-container">
      <n-layout-header>
        <moon-logo />
        <moon-navigation />
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 71px">
        <n-layout-sider bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="270" :native-scrollbar="false">
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
  //组件引入
  import MoonSider from '@/layouts/default/sider/index.vue'
  import MoonLogo from '@/layouts/default/logo/index.vue'
  import MoonNavigation from '@/layouts/default/navigation/index.vue'
  import { NConfigProvider, NLayout, NLayoutHeader, NLayoutSider, NLayoutContent } from 'naive-ui'

  const defaultTheme = {}
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
