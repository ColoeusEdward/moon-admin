<template>
  <!-- <n-layout-content> -->
  <div class="dash">
    <n-spin :show="spinShow">
      <grid-layout ref="gridLayoutR" v-model:layout="layout" :col-num="12" :row-height="30" :is-draggable="gridConfig.draggable" :is-resizable="gridConfig.resizable" :vertical-compact="gridConfig.compact" :use-css-transforms="true">
        <grid-item :ref="'gridItem' + item.i" v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :class="[item.type + 'Item', ui.aniControl(item, curActiveBtnI)]" :style="ui.gridItemStyle(item)" class="btn" @mousedown="record_mouse_time" @mouseup="handleItemClick(item.i, item)">
          <span v-if="item.type == 'btn' && !item.src" class="text">{{ item.text || item.i }}</span>

          <div v-if="item.type == 'btn' && item.src" class="imgBtn">
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <div v-if="item.src" style="color:#f5f5d5;width:100%;" :style="ui.listTitleStyle(item)" class="iconbtn">
                  <div class="imgCon">
                    <img :src="item.src" :alt="item.text" />
                  </div>
                </div>
              </template>
              <span>{{ item.text }}</span>
            </n-tooltip>
          </div>

          <n-upload ref="deployUpload" :default-upload="false" abstract v-if="item.type == 'upload'" action="2" :headers="{ 'naive-info': 'hello!' }" :data="sb.upLoadData" :on-update:file-list="(list) => { sb.handleUploadUdpate(list, item.i, progObj) }">
            <n-upload-trigger #="{ handleClick }" abstract>
              <div class="upload" @mouseup="sb.handleUpload(handleClick, mouse_time)">
                <uploadProgress v-if="curClickBtnI == item.i" :prog="progObj[item.i] || 0" />
                <span v-if="!item.src" class="text">{{ item.text || item.i }}</span>
                <n-tooltip placement="bottom" trigger="hover">
                  <template #trigger>
                    <div v-if="item.src" style="color:#f5f5d5;width:100%;" :style="ui.listTitleStyle(item)" class="iconbtn">
                      <div class="imgCon">
                        <img :src="item.src" :alt="item.text" />
                      </div>
                    </div>
                  </template>
                  <span>{{ item.text }}</span>
                </n-tooltip>
              </div>
            </n-upload-trigger>
          </n-upload>

          <div v-if="item.type == 'iconbtn'" class="iconbtn">
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <n-icon size="80">
                  <component :is="item.iconComp" />
                  <!-- <refresh-outlined /> -->
                </n-icon>
              </template>
              <span>{{ item.text }}</span>
            </n-tooltip>
          </div>

          <div v-if="item.type == 'list'" class="list">
            <div v-if="item.list" style="color:#f5f5d5;width:100%;margin-bottom:10px;" :style="ui.listTitleStyle(item)">{{ item.text }}</div>
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <div v-if="item.src && !item.list" style="color:#f5f5d5;width:100%;" :style="ui.listTitleStyle(item)" class="iconbtn">
                  <div class="imgCon">
                    <img :src="item.src" :alt="item.text" />
                    <!-- <div class="img" :style="{backgroundImgae:`url(${item.src})`;}" /> -->
                  </div>
                </div>
              </template>
              <span>{{ item.text }}</span>
            </n-tooltip>
            <!-- <c-scrollbar width="100%" height="640px" direction="y" v-if="item.list">
              <div class="listRow" v-for="(le,li) in item.list" @mouseup.stop="handleListRowClick(le)">
                <div class="name sizeName" v-if="item.text == '查看文件大小'" style="text-align:left;">
                  <div style="color:blue;">{{ le[0] }}</div>
                  <span>{{ le[1] }}</span>
                </div>
                <div class="name" :style="ui.listRowNameStyle(le)" v-else>{{ le }}</div>
                <n-icon size="30">
                  <ContentCopyFilled />
                </n-icon>
              </div>
            </c-scrollbar> -->
          </div>

          <div v-if="item.type == 'icon'" class="icon">
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <div class="imgCon">
                  <img :src="item.src" :alt="item.text" />
                  <!-- <div class="img" :style="{backgroundImgae:`url(${item.src})`;}" /> -->
                </div>
              </template>
              <span>{{ item.text }}</span>
            </n-tooltip>
          </div>

          <div v-if="item.type == 'input'" class="input">
            <n-tooltip placement="bottom" trigger="hover">
              <template #trigger>
                <div v-if="item.src && !item.expend" style="color:#f5f5d5;width:100%;" :style="ui.listTitleStyle(item)" class="iconbtn">
                  <div class="imgCon">
                    <img :src="item.src" :alt="item.text" />
                  </div>
                </div>
              </template>
              <span>{{ item.text }}</span>
            </n-tooltip>
            <div style="color:#fff;width:100%;margin-bottom:6px;" v-if="item.expend">{{ item.text }}</div>
            <div class="inputBody" v-if="item.expend">
              <n-input style="font-size:16px;" @mouseup.stop v-model:value="inputContent" type="textarea" placeholder="多项用回车分割" clearable />
              <n-input style="margin-bottom:10px;" v-if="targetInputList.indexOf(item.text) != -1" v-model:value="targetInputContent" placeholder="上传地址" clearable />
              <n-button style="width:90%;height:40px;" type="primary" @mouseup.stop="handleInputBtn(item)">提交</n-button>
            </div>
          </div>

          <div v-if="item.type == 'chart'" class="chart">
            <component :is="item.comp" />
          </div>
          <!-- <span class="remove" @click="removeItem(item.i)">x</span> -->
        </grid-item>
      </grid-layout>
    </n-spin>
  </div>
  <!-- </n-layout-content> -->
</template>

<script setup lang="ts">
import { GridLayout, GridItem } from 'vue3-grid-layout'
import { ref, reactive, onMounted, defineAsyncComponent, shallowReactive } from 'vue'
import {Refresh} from '@icon-park/vue-next'
import useSimpleBtn from './simpleBtn'
import uiFn from './ui'



// import { GridLayout, GridItem } from 'vue-grid-layout'
import { NSpin, NIcon, useMessage, NTooltip, NInput, NButton, NUpload, NUploadTrigger, useDialog } from 'naive-ui'
// import GridLayout from 'vue-grid-layout'
// const { ctx: that } = getCurrentInstance() as any
const msg = useMessage()
const dialog = useDialog()
// import { useRouter } from 'vue-router'
// import type { Router } from 'vue-router'
// const gridLayoutR:{value?:{layoutUpdate:()=>any}} = ref({})
const gridLayoutR = ref({ layoutUpdate: () => { } })
const deployUpload = ref<InstanceType<typeof NUpload>>()
// const value = ref(null)
//每行最长20
// let sbr = reactive(sb)
let origin_layout = []
// let mouse_time = 0 //鼠标按住时间
const mouse_time = ref(0) //鼠标按住时间
const sb = useSimpleBtn()
const ui = uiFn()
const deploySlotProps = {
  handleClick: () => {
    console.log('ffff')
  }
}

const spinShow = ref(false) //loading显示
let inputContent = ref('')
let targetInputContent = ref('')
const targetInputList = ['自由上传文件']
const curClickBtnI = ref('0')
const curActiveBtnI = ref('0') //用来控制动画的下标, 隔一秒就会自动归零
const progObj: any = reactive({})


let layout: any = shallowReactive([
  { x: 0, y: 0, w: 1, h: 3, i: '0', type: 'btn', text: '释放式上传', src: 'https://img.icons8.com/dusk/100/000000/upgrade.png' },
  { x: 1, y: 0, w: 1, h: 3, i: '1', type: 'btn', text: '释放MP4', src: 'https://img.icons8.com/color/100/000000/video.png' },
  { x: 4, y: 0, w: 1, h: 3, i: '2', type: 'icon', text: '命令行', src: 'https://img.icons8.com/dusk/100/000000/command-line.png' },
  { x: 5, y: 0, w: 1, h: 3, i: '11', type: 'icon', text: 'aria2', src: 'https://raw.githubusercontent.com/mayswind/AriaNg-Native/master/assets/AriaNg.ico' },
  { x: 6, y: 0, w: 2, h: 3, i: '3', type: 'btn' },
  { x: 8, y: 2, w: 2, h: 3, i: '4', type: 'input', text: '自由上传文件', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/upload.png' },
  { x: 10, y: 0, w: 1, h: 3, i: '12', type: 'upload', text: '部署', src: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/deployment-2369058-1978336.png' },
  { x: 11, y: 0, w: 1, h: 3, i: '5', type: 'iconbtn', text: '复原', iconComp: Refresh },
  { x: 0, y: 3, w: 2, h: 4, i: '6', type: 'list', text: '查看剩余空间', src: 'https://icons-for-free.com/iconfiles/png/512/storage+dropbox+dropbox+logo+file+storage+file+transfer+upload-1320196083387888656.png' },
  { x: 2, y: 2, w: 2, h: 3, i: '7', type: 'input', text: '删除文件', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/delete-sign.png' },
  { x: 4, y: 2, w: 2, h: 4, i: '8', type: 'list', text: '查看文件大小', src: 'https://icons-for-free.com/iconfiles/png/512/file+format+mp4+paper+icon-1320167130956649663.png' },
  { x: 6, y: 2, w: 1, h: 3, i: '9', type: 'icon', text: '游踪', src: 'https://img.icons8.com/color/100/000000/controller.png' },
  { x: 7, y: 2, w: 1, h: 3, i: '10', type: 'icon', text: 'onedrive网盘', src: 'https://img.icons8.com/clouds/150/000000/skydrive.png' }
  , { x: 10, y: 2, w: 1, h: 3, i: '13', type: 'icon', text: '下载文件夹', src: 'https://img.icons8.com/dusk/100/000000/download.png' }
  , { x: 8, y: 0, w: 2, h: 6, i: '14', type: 'chart', comp: 'memPercent' }
  , { x: 2, y: 5, w: 1, h: 3, i: '15', type: 'upload', text: '上传至temp', src: 'https://img.icons8.com/plasticine/200/000000/add-folder.png' }
  , { x: 11, y: 2, w: 1, h: 3, i: '16', type: 'icon', text: '老upup', src: 'https://img.icons8.com/dusk/128/000000/home.png' }
  , { x: 11, y: 3, w: 1, h: 3, i: '17', type: 'btn', text: '回退', src: 'https://img.icons8.com/bubbles/2x/undo.png' }
  , { x: 0, y: 5, w: 1, h: 3, i: '18', type: 'btn', text: '更新证书', src: 'https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/100/000000/external-certificate-award-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png' }
  , { x: 6, y: 4, w: 1, h: 3, i: '19', type: 'btn', text: '重启后端', src: 'https://img.icons8.com/bubbles/100/000000/restart.png' }
  , { x: 3, y: 5, w: 1, h: 3, i: '20', type: 'btn', text: '更新onedrive Index代码', src: 'https://img.icons8.com/color/144/000000/git.png' }
  , { x: 2, y: 6, w: 2, h: 6, i: '21', type: 'chart', text: '计时器', comp: 'timeCounter' }
  // { x: 8, y: 2, w: 2, h: 2, i: '12', type: 'input', text: '自由上传文件', expend: false }
])
let gridConfig = {
  draggable: true,
  resizable: true,
  compact: true
}

//function ------------------------------------------------------------------------------------------------------------------------
const handleClick = async () => {
  console.log('clickccc')
}
const showLeftStore = async (i) => {
  //展示record列表
  let list = await sb.getLeftStore()
  let item = layout.find((e) => {
    return e.i == i
  })
  item.list = list
}
const showRecordSizeClick = async (i) => {
  //展示record列表
  let list = await sb.getRecordSizeList()
  let item = layout.find((e) => {
    return e.i == i
  })
  item.list = list
}
const size_recover = async () => {
  //复原布局
  layout.forEach((e, i) => {
    for (var key in e) {
      if (key == 'iconComp') return
      e[key] = origin_layout[i][key]
    }
  })
  // that.$refs.gridLayout.layoutUpdate
  gridLayoutR.value?.layoutUpdate()
}
const controlClick = async (i) => {
  let list = [() => { }]
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
  list[10] = async () => {
    sb.goOneDrive()
  }
  list[11] = async () => {
    sb.goAria()
  }
  list[13] = async () => {
    sb.goDownDir()
  }
  list[16] = async () => {
    sb.goOldUp()
  }
  list[17] = async () => {
    sb.rollBackVueConfirm(dialog)
  }
  list[18] = async () => {
    sb.eccUpdate(dialog)
  }
  list[19] = async () => {
    sb.lexueReboot(dialog)
  }
  list[20] = async () => {
    sb.pullOnedriveInedx()
  }
  list[i] && (await list[i]())
}

const record_mouse_time = () => {
  // mouse_time = new Date().getTime()
  mouse_time.value = new Date().getTime()
}

// method ------------------------------------------------------------------------------------------------------------------------

const handleItemClick = async (i, item) => {
  let time = new Date().getTime()
  console.log('mouse_time', mouse_time)
  // if (time - mouse_time >= 200) {
  if (time - mouse_time.value >= 200) {
    return
  }
  console.log('i', i)
  curClickBtnI.value = i
  curActiveBtnI.value = i
  window.setTimeout(() => {
    curActiveBtnI.value = '-1'
  }, 800)
  if (item.type == 'upload') {
    console.log(`curClickBtnI.value`, curClickBtnI.value);
    return
  }

  ui.controlGridItemSize(i, layout, gridLayoutR)
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

const handleInputBtn = async (item) => {
  let fnObj = {
    删除文件: async () => {
      return await sb.handleDeleteFile(inputContent)
    },
    自由上传文件: async () => {
      return inputContent.value && targetInputContent.value && (await sb.recordFree(inputContent, targetInputContent))
    }
  }
  spinShow.value = true
  fnObj[item.text] && (await fnObj[item.text]())
  spinShow.value = false
}

// hook ------------------------------------------------------------------------------------------------------------------------
onMounted(() => {
  // console.log("refs", that)
  // console.log("that.proxy", that.proxy)
  // console.log('gridLayoutR', gridLayoutR)
  // console.log('deployUpload', deployUpload)
  ui.setLayoutColor(layout)
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
  // transition: all 0.2s ease;
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
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=");
  background-position: bottom right;
  padding: 0 3px 3px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: se-resize;
}
.vue-grid-item {
  &.btn {
    // animation: spreadborder 1s 1;
  }
  &.btn.active {
    animation: spreadborder 0.8s 1;
    // background-color: #3f5772 !important;
    @keyframes spreadborder {
      0% {
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
      }
      100% {
        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
      }
    }
  }
  &.vue-grid-placeholder {
    background-color: #000;
  }
}
.vue-grid-item:not(.vue-grid-placeholder) {
  user-select: none;
  background: #3ba786;
  // border: 1px solid #3ba786;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
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
    // transition: all 0.2s ease;
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
    .imgCon {
      width: 110px;
      height: 110px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 14px;
        background-color: none;
      }
    }
  }

  .chart {
    width: 100%;
    height: 100%;
  }

  .icon {
    .imgCon {
      width: 100px;
      height: 100px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 14px;
        background-color: none;
      }
    }
  }

  .input {
    font-size: 24px;
    .imgCon {
      width: 100px;
      height: 100px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 14px;
        background-color: none;
      }
    }
  }

  .iconbtn,
  .imgBtn,
  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .iconbtn {
  }
  .imgBtn {
    .imgCon {
      width: 100px;
      height: 100px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 14px;
        background-color: none;
      }
    }
  }
  .upload {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .uploadProgress {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #000;
    }
    .imgCon {
      width: 100px;
      height: 100px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 14px;
        background-color: none;
      }
    }
  }
}
.btn {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition-property: width, height, transform !important;
  transition-timing-function: ease !important;
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
