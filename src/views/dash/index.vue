<template>
  <!-- <n-layout-content> -->
  <div class="dash">
    <div class="layoutJSON">
      Displayed as <code>[x, y, w, h]</code>:
      <div class="columns">
        <div v-for="item in layout" :key="item.i" class="layoutItem">
          <b>{{ item.i }}</b
          >: [{{ item.x }}, {{ item.y }}, {{ item.w }}, {{ item.h }}]
        </div>
      </div>
    </div>
    <grid-layout v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="gridConfig.draggable" :is-resizable="gridConfig.resizable" :vertical-compact="gridConfig.compact" :use-css-transforms="true">
      <grid-item v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
        <span class="text">{{ item.i }}</span>
        <!-- <span class="remove" @click="removeItem(item.i)">x</span> -->
      </grid-item>
    </grid-layout>
  </div>
  <!-- </n-layout-content> -->
</template>

<script setup lang="ts">
  // import { ref } from 'vue'
  // import { NButton, NInput } from 'naive-ui'
  // import { useRouter } from 'vue-router'
  // import type { Router } from 'vue-router'

  // const value = ref(null)
  const testLayout = [
    { x: 0, y: 0, w: 2, h: 2, i: '0' },
    { x: 2, y: 0, w: 2, h: 4, i: '1' },
    { x: 4, y: 0, w: 2, h: 5, i: '2' },
    { x: 6, y: 0, w: 2, h: 3, i: '3' },
    { x: 8, y: 0, w: 2, h: 3, i: '4' },
    { x: 10, y: 0, w: 2, h: 3, i: '5' },
    { x: 0, y: 5, w: 2, h: 5, i: '6' },
    { x: 2, y: 5, w: 2, h: 5, i: '7' },
    { x: 4, y: 5, w: 2, h: 5, i: '8' },
    { x: 6, y: 4, w: 2, h: 4, i: '9' },
    { x: 8, y: 4, w: 2, h: 4, i: '10' },
    { x: 10, y: 4, w: 2, h: 4, i: '11' },
    { x: 0, y: 10, w: 2, h: 5, i: '12' },
    { x: 2, y: 10, w: 2, h: 5, i: '13' },
    { x: 4, y: 8, w: 2, h: 4, i: '14' },
    { x: 6, y: 8, w: 2, h: 4, i: '15' },
    { x: 8, y: 10, w: 2, h: 5, i: '16' },
    { x: 10, y: 4, w: 2, h: 2, i: '17' },
    { x: 0, y: 9, w: 2, h: 3, i: '18' },
    { x: 2, y: 6, w: 2, h: 2, i: '19' }
  ]
  let layout = JSON.parse(JSON.stringify(testLayout))
  let gridConfig = {
    draggable: true,
    resizable: true,
    compact: true
  }

  // 登陆处理
  // const router: Router = useRouter()
  // const handleLogin = (): void => {
  //   localStorage.setItem('token', 'mock-token')
  //   router.push({ path: 'home' })
  // }
</script>

<style lang="scss" scoped>
  .dash {
    width: 100%;
    height: 100%;
  }
</style>
