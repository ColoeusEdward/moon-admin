<template>
  <!-- <n-layout-content> -->
  <div class="dash">
    <n-spin :show="spinShow">
      <grid-layout v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="gridConfig.draggable" :is-resizable="gridConfig.resizable" :vertical-compact="gridConfig.compact" :use-css-transforms="true">
        <grid-item v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :class="item.type" @click="handleItemClick(item.i)">
          <span v-if="item.type == 'btn'" class="text">{{ item.text || item.i }}</span>
          <!-- <span class="remove" @click="removeItem(item.i)">x</span> -->
        </grid-item>
      </grid-layout>
    </n-spin>
  </div>
  <!-- </n-layout-content> -->
</template>

<script setup lang="ts">
  import useSimpleBtn from './simpleBtn'
  import { ref } from 'vue'
  import { NSpin } from 'naive-ui'
  // import { useRouter } from 'vue-router'
  // import type { Router } from 'vue-router'

  // const value = ref(null)
  //每行最长20
  // let sbr = reactive(sb)
  const sb = useSimpleBtn()
  const spinShow = ref(false)

  const layout = [
    { x: 0, y: 0, w: 2, h: 2, i: '0', type: 'btn', text: '释放式上传', click: sb.recordRelease },
    { x: 2, y: 0, w: 2, h: 2, i: '1', type: 'btn', text: '释放MP4', click: sb.mp4Release },
    { x: 4, y: 0, w: 2, h: 5, i: '2', type: 'btn' },
    { x: 6, y: 0, w: 2, h: 3, i: '3', type: 'btn' },
    { x: 8, y: 0, w: 2, h: 3, i: '4', type: 'btn' },
    { x: 10, y: 0, w: 2, h: 3, i: '5', type: 'btn' },
    { x: 0, y: 2, w: 2, h: 4, i: '6', type: 'list', text: '查看record' }
  ]
  let gridConfig = {
    draggable: true,
    resizable: true,
    compact: true
  }

  // method
  const handleItemClick = async (i) => {
    spinShow.value = true
    layout[i].click && (await layout[i].click())
    spinShow.value = false
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
    height: 90vh;
  }

  .content {
    width: 100%;
  }
  .vue-grid-layout {
    background: #0b0b0e;
  }
  .layoutJSON {
    background: #0b0b0e;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
  }
  .columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
  }
  .vue-resizable-handle {
    z-index: 5000;
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
  }
  .vue-grid-item {
    &.btn:active {
      background-color: #3f5772;
    }
    &.vue-grid-placeholder {
      background-color: #000;
    }
  }
  .vue-grid-item:not(.vue-grid-placeholder) {
    user-select: none;
    background: #3ba786;
    border: 1px solid #3ba786;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .vue-grid-item.resizing {
    opacity: 0.9;
    border: 10px solid #fff;
  }
  .vue-grid-item.static {
    background: #cce;
  }
  .vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // margin: auto;
    height: 32px;
  }
  .vue-grid-item .minMax {
    font-size: 12px;
  }
  .vue-grid-item .add {
    cursor: pointer;
  }
  .remove {
    position: absolute;
    right: 2px;
    top: 0;
    cursor: pointer;
  }
</style>
