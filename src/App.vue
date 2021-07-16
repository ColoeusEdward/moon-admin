<template>
  <moon-header-container :style="{ height: 200, backgroundColor: 'green' }" />
  <!--  <router-view></router-view>-->
  <!-- <div>123</div> -->
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MoonHeaderContainer from '@/layouts/header/index.vue'

  export default defineComponent({
    name: 'App',
    components: {
      MoonHeaderContainer
    }
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
