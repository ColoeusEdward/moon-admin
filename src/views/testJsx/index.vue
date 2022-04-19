<template>
  <jsxIndex :test="566" />
  <DefComp :prop="{te:'jjj'}" >
    dfdfdfdfdfggggconsole.log("🚀 ~ file: index.tsx ~ line 25 ~ ,setup ~ elref", elref)等等
  </DefComp>
  <!-- <DefComp :prop="{te:'kkk'}" /> -->
</template>

<script setup lang="ts">
import {defineComponent} from 'vue'
import jsxIndex from './oldindex'
import DefComp from '@/components/defComp'



</script>

<style lang="scss" scoped>
  // :deep(.fuckChild){
  //   color: blue;
  // }
  // :deep(.test){
  //   color: red !important;
  // }
</style>