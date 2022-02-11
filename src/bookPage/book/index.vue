<template>
  <Book></Book>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui';
import { provide } from 'vue';
import useBook from './book';

const {Book} = useBook()
window.$msg = useMessage()
provide('test','fuckyouman')
</script>

<style lang="scss" scoped>
</style>