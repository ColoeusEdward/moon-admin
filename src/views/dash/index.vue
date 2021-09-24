<template>
  <!-- <n-layout-content> -->
  <div class="dash">
    <n-spin :show="spinShow">
      <grid-layout ref="gridLayout" v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="gridConfig.draggable" :is-resizable="gridConfig.resizable" :vertical-compact="gridConfig.compact" :use-css-transforms="true">
        <grid-item :ref="'gridItem'+item.i" v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :class="item.type+'Item'" class="btn" @mousedown="record_mouse_time" @mouseup="handleItemClick(item.i)">

          <span v-if="item.type == 'btn'" class="text">{{ item.text || item.i }}</span>

          <div v-if="item.type == 'iconbtn'" class="iconbtn">
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <n-icon size="80">
                  <component :is="item.iconComp" />
                  <!-- <refresh-outlined /> -->
                </n-icon>
              </template>
              <span>{{item.text}}</span>
            </n-tooltip>
          </div>

          <div v-if="item.type == 'list'" class="list">
            <div style="color:#f5f5d5;width:100%;margin-bottom:10px;" :style="listTitleStyle(item)">{{item.text}}</div>
            <c-scrollbar width="100%" height="640px" direction='y' v-if="item.list">
              <div class="listRow" v-for="(le,li) in item.list" @mouseup.stop="handleListRowClick(le)">
                <div class="name sizeName" v-if="item.text=='查看文件大小'" style="text-align:left;">
                  <div style="color:blue;">
                    {{le[0]}}
                  </div>
                  <span>{{le[1]}}</span>
                </div>
                <!-- <div class="name" v-if="item.text=='查看record'">{{le}}</div> -->
                <div class="name" :style="listRowNameStyle(le)" v-else>{{le}}</div>
                <n-icon size="30">
                  <ContentCopyFilled />
                </n-icon>
              </div>
            </c-scrollbar>
          </div>

          <div v-if="item.type == 'icon'" class="icon">
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <div class="imgCon">
                  <img :src="item.src" :alt="item.text">
                  <!-- <div class="img" :style="{backgroundImgae:`url(${item.src})`;}" /> -->
                </div>
              </template>
              <span>{{item.text}}</span>
            </n-tooltip>
          </div>

          <!-- <span class="remove" @click="removeItem(item.i)">x</span> -->
        </grid-item>
      </grid-layout>
    </n-spin>
  </div>
  <!-- </n-layout-content> -->
</template>

<script setup lang="ts">
// import { Copy } from '@vicons/ionicons5'
import { ContentCopyFilled,RefreshOutlined } from '@vicons/material'
import useSimpleBtn from './simpleBtn'
import { ref } from 'vue'
import { NSpin, NIcon, useMessage, NTooltip } from 'naive-ui'
import { getCurrentInstance, onMounted } from 'vue'
let { ctx: that } = getCurrentInstance()
const msg = useMessage()
// import { useRouter } from 'vue-router'
// import type { Router } from 'vue-router'

// const value = ref(null)
//每行最长20
// let sbr = reactive(sb)
let origin_layout = []
let mouse_time = 0 //鼠标按住时间
const sb = useSimpleBtn()

const spinShow = ref(false) //loading显示

let layout = [
  { x: 0, y: 0, w: 2, h: 2, i: '0', type: 'btn', text: '释放式上传' },
  { x: 2, y: 0, w: 2, h: 2, i: '1', type: 'btn', text: '释放MP4' },
  { x: 4, y: 0, w: 2, h: 2, i: '2', type: 'btn', text: '命令行' },
  { x: 6, y: 0, w: 2, h: 3, i: '3', type: 'btn' },
  { x: 8, y: 0, w: 3, h: 3, i: '4', type: 'btn' },
  { x: 11, y: 0, w: 1, h: 3, i: '5', type: 'iconbtn', text: '复原',iconComp:RefreshOutlined },
  { x: 0, y: 2, w: 2, h: 4, i: '6', type: 'list', text: '查看剩余空间' },
  { x: 2, y: 2, w: 2, h: 2, i: '7', type: 'btn', text: 'dd' },
  { x: 4, y: 2, w: 2, h: 4, i: '8', type: 'list', text: '查看文件大小' },
  { x: 6, y: 2, w: 1, h: 3, i: '9', type: 'icon', text: '游踪', src: 'http://tva1.sinaimg.cn/large/002Imx2Egy1gurh4vnejzj6069069wet02.jpg' }
]
let gridConfig = {
  draggable: true,
  resizable: true,
  compact: true
}

//function ------------------------------------------------------------------------------------------------------------------------
const showLeftStore = async (i) => {
  //展示record列表
  let list = await sb.getLeftStore()
  layout[i].list = list
}
const showRecordSizeClick = async (i) => {
  //展示record列表
  let list = await sb.getRecordSizeList()
  layout[i].list = list
}
const size_recover = async (i) => {
  //复原布局
  layout.forEach((e, i) => {
    for (var key in e) {
      if(key=='iconComp') return
      e[key] = origin_layout[i][key]
    }
  })
  that.$refs.gridLayout.layoutUpdate()
}
const controlClick = async (i) => {
  let list = []
  list[0] = async () => {
    await sb.recordRelease()
  }
  list[1] = async () => {
    await sb.mp4Release()
  }
  list[2] = () => {
    sb.cmd()
  }
  list[5] = async () => {
    await size_recover()
  }
  list[6] = async () => {
    await showLeftStore(6)
  }
  list[8] = async () => {
    await showRecordSizeClick(8)
  }
  list[9] = async () => {
    sb.goGameNga()
  }
  list[i] && (await list[i]())
}

const controlGridItemSize = (i) => {
  console.log('control', i)
  let list = []
  list[6] = list[8] = () => {
    layout[i].w = 4
    layout[i].h = 18
    return true
  }
  list[i] && list[i]() && that.$refs.gridLayout.layoutUpdate()
}

const record_mouse_time = () => {
  mouse_time = new Date().getTime()
}

// method ------------------------------------------------------------------------------------------------------------------------

const handleItemClick = async (i) => {
  let time = new Date().getTime()
  if (time - mouse_time >= 200) {
    return
  }
  console.log('i', i)
  controlGridItemSize(i)
  spinShow.value = true
  await controlClick(i)
  spinShow.value = false
}

const handleListRowClick = async (name) => {
  if (name.length == 2) {
    name = name[1]
  }
  const clipboardObj = navigator.clipboard
  await clipboardObj.writeText(name)
  msg.success('复制成功')
}

const listTitleStyle = (item) => {
  let style = {}
  if (item.list) {
    style.borderBottom = '1px solid #fff'
  } else {
    style.marginTop = '20%'
  }
  return style
}

const listRowNameStyle = (le) => {
  let style = {}
  if (le.search('32G') != -1) {
    style.color = 'blue'
  }
  return style
}

// hook ------------------------------------------------------------------------------------------------------------------------
onMounted(() => {
  origin_layout = JSON.parse(JSON.stringify(layout))
})

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
.vue-grid-item {
  // transition:all 0.2s ease;
  .text {
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
  &.listItem {
    transition: all 0.2s ease;
  }
  .list {
    width: 100%;
    height: 100%;
    font-size: 24px;
    .listRow {
      display: flex;
      padding: 0 20px;
      &:hover,
      &:active {
        background-color: cornflowerblue;
      }

      .name {
        flex-grow: 1;
        text-align: center;
        &.sizeName {
          display: flex;
          div {
            width: 80px;
          }
        }
      }
    }
  }

  .icon {
    .imgCon {
      width: 90px;
      height: 90px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 14px;
      }
    }
  }

  .iconbtn,
  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .iconbtn {

  }
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
