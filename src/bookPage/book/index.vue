<template>
  <Book />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import useBook from './book';
const {Book} = useBook()

provide('test','fuckyouman')
</script>

<style lang="scss" scoped>
</style>