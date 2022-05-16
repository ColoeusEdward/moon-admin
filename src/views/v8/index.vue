<template>
  <IndexTSX />
</template>

<script setup lang="ts">
import { defineComponent, provide } from 'vue';
import useIndexTSX from './indexTSX'
const { IndexTSX } = useIndexTSX()

provide('test', 'fuckyouman')
</script>

<style lang="scss" scoped>
</style>