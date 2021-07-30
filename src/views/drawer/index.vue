<template>
  <n-drawer :show="showSettingDrawer" :width="360" placement="right">
    <n-drawer-content title="设置">
      <n-space>
        <n-button @click="changeTheme">切换主题</n-button>
      </n-space>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  import { NDrawer, NDrawerContent, NSpace, NButton } from 'naive-ui'
  import { useThemeStore } from '@/store/modules/theme'

  type Props = {
    showSettingDrawer: boolean
  }
  const props = defineProps<Props>()
  // const show = props.showSettingDrawer

  // 切换默认主题
  const themeStore = useThemeStore()

  const changeTheme = () => {
    themeStore.darkTheme = !themeStore.darkTheme
  }
</script>

<style scoped></style>
