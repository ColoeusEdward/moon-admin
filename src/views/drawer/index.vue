<template>
  <n-drawer v-model:show="showSettingDrawer" :width="360" placement="right">
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
  import { watch } from 'vue'

  type Props = {
    showSettingDrawer: boolean
  }

  let prop = defineProps<Props>()
  const emit = defineEmits(['update:showSettingDrawer'])
  const themeStore = useThemeStore() // 切换默认主题

  const changeTheme = () => {
    themeStore.darkTheme = !themeStore.darkTheme
  }

  watch(
    () => prop.showSettingDrawer,
    (n) => {
      //多层v-model
      emit('update:showSettingDrawer', n)
    }
  )
</script>

<style scoped></style>
