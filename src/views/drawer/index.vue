<template>
  <n-drawer v-model:show="show" :width="360" placement="right">
    <n-drawer-content title="设置" :closable="true">
      <n-space>
        <n-button @click="changeTheme">切换主题</n-button>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { NDrawer, NDrawerContent, NSpace, NButton } from 'naive-ui'
  import { useThemeStore } from '@/store/modules/theme'
  import { inject } from 'vue'

  const themeStore = useThemeStore() // 切换默认主题

  //data
  const show:any = inject('showSettingDrawer')

  //method
  const changeTheme = () => {
    themeStore.darkTheme = !themeStore.darkTheme
  }
</script>

<style scoped></style>
