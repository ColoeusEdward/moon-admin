<template>
  <n-config-provider :theme="darkTheme">
    <router-view />
  </n-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { darkTheme, NConfigProvider } from 'naive-ui'

  export default defineComponent({
    name: 'App',
    components: {
      NConfigProvider
    },
    setup() {
      return {
        darkTheme
      }
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
