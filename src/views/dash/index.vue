<template>
  <dashIndex/>
</template>

<script setup lang="ts">
import dashIndex from './dashIndex'
import { useThemeStore } from '@/store/modules/theme'
import { useDialog } from 'naive-ui'
const dialog = useDialog()
const themeStore = useThemeStore()
themeStore.setDialog(dialog)
</script>

<style lang="scss" scoped>
  // :deep(.fuckChild){
  //   color: blue;
  // }
  // :deep(.test){
  //   color: red !important;
  // }
</style>