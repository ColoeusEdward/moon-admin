<template>
  <jsxIndex :test="566" />
  <DefComp :prop="{te:'jjj'}" />
  <DefComp :prop="{te:'kkk'}" />
</template>

<script setup lang="ts">
import {defineComponent} from 'vue'
import jsxIndex from './oldindex'
import DefComp from '@/components/defComp/defComp'



</script>

<style lang="scss" scoped>
  // :deep(.fuckChild){
  //   color: blue;
  // }
  // :deep(.test){
  //   color: red !important;
  // }
</style>