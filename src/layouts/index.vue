<template>
  <n-config-provider :theme-overrides="defaultTheme" class="moon-layout-theme-config">
    <n-layout class="moon-layout-container">
      <n-layout-header>
        <moon-header-container />
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

<script type="ts" setup>
  //组件引入
  import MoonHeaderContainer from '@/layouts/header/index.vue'
  import MoonSider from '@/layouts/sider/index.vue'
  import { NConfigProvider, NLayout, NLayoutHeader, NLayoutSider, NLayoutContent } from 'naive-ui'

  //主体引入
  import themeOverrides from '@/settings/theme'

  const defaultTheme = themeOverrides['fin-wave']
</script>
<style type="scss" scoped>
  .moon-layout-theme-config {
    height: 100%;
    position: relative;
  }

  .moon-layout-container {
    min-height: 100%;
  }
</style>
