
import { sleep } from '@/utils';
import { shallowReactive, ref } from 'vue';
import { RefreshOutlined } from '@vicons/material';
import { GridItem } from 'vue3-grid-layout'
import useUi from './ui'
import style from './dashIndex.module.scss'
import './grid.scss'
import { useThemeStore } from '@/store/modules/theme';

const themeStore = useThemeStore()
const ui = useUi()

export default function useGrid(gridLayoutR) {
  let layoutOrigin
  const curActiveBtnI = ref('-1')
  const curClickBtnI = ref('-1')
  const mouseTime = ref(0)
  const gridConfig = {
    draggable: true,
    resizable: true,
    compact: true
  }
  let layout = [
    { x: 0, y: 0, w: 1, h: 3, i: '0', type: 'btn', text: '释放式上传', src: 'https://img.icons8.com/dusk/100/000000/upgrade.png' },
    { x: 1, y: 0, w: 1, h: 3, i: '1', type: 'btn', text: '释放MP4', src: 'https://img.icons8.com/color/100/000000/video.png' },
    { x: 4, y: 0, w: 1, h: 3, i: '2', type: 'icon', text: '命令行', src: 'https://img.icons8.com/dusk/100/000000/command-line.png' },
    { x: 5, y: 0, w: 1, h: 3, i: '11', type: 'icon', text: 'aria2', src: 'https://raw.githubusercontent.com/mayswind/AriaNg-Native/master/assets/AriaNg.ico' },
    { x: 6, y: 0, w: 2, h: 3, i: '3', type: 'btn' },
    { x: 8, y: 6, w: 2, h: 3, i: '4', type: 'input', text: '自由上传文件', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/upload.png' },
    { x: 10, y: 0, w: 1, h: 3, i: '12', type: 'upload', text: '部署', src: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/deployment-2369058-1978336.png' },
    { x: 11, y: 0, w: 1, h: 3, i: '5', type: 'iconbtn', text: '复原', iconComp: RefreshOutlined },
    { x: 0, y: 3, w: 2, h: 4, i: '6', type: 'list', text: '查看剩余空间', src: 'https://icons-for-free.com/iconfiles/png/512/storage+dropbox+dropbox+logo+file+storage+file+transfer+upload-1320196083387888656.png' },
    { x: 2, y: 0, w: 2, h: 3, i: '7', type: 'input', text: '删除文件', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/delete-sign.png' },
    { x: 4, y: 3, w: 2, h: 4, i: '8', type: 'list', text: '查看文件大小', src: 'https://icons-for-free.com/iconfiles/png/512/file+format+mp4+paper+icon-1320167130956649663.png' },
    { x: 6, y: 3, w: 1, h: 3, i: '9', type: 'icon', text: '游踪', src: 'https://img.icons8.com/color/100/000000/controller.png' },
    { x: 7, y: 3, w: 1, h: 3, i: '10', type: 'icon', text: 'onedrive网盘', src: 'https://img.icons8.com/clouds/150/000000/skydrive.png' }
    , { x: 10, y: 3, w: 1, h: 3, i: '13', type: 'icon', text: '下载文件夹', src: 'https://img.icons8.com/dusk/100/000000/download.png' }
    , { x: 8, y: 0, w: 2, h: 6, i: '14', type: 'chart', comp: 'memPercent' }
    , { x: 2, y: 3, w: 1, h: 3, i: '15', type: 'upload', text: '上传至temp', src: 'https://img.icons8.com/plasticine/200/000000/add-folder.png' }
    , { x: 11, y: 3, w: 1, h: 3, i: '16', type: 'icon', text: '老upup', src: 'https://img.icons8.com/dusk/128/000000/home.png' }
    , { x: 11, y: 6, w: 1, h: 3, i: '17', type: 'btn', text: '回退', src: 'https://img.icons8.com/bubbles/2x/undo.png' }
    , { x: 0, y: 7, w: 1, h: 3, i: '18', type: 'btn', text: '更新证书', src: 'https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/100/000000/external-certificate-award-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png' }
    , { x: 6, y: 6, w: 1, h: 3, i: '19', type: 'btn', text: '重启后端', src: 'https://img.icons8.com/bubbles/100/000000/restart.png' }
    , { x: 3, y: 3, w: 1, h: 3, i: '20', type: 'btn', text: '更新onedrive Index代码', src: 'https://img.icons8.com/color/144/000000/git.png' }
    , { x: 2, y: 6, w: 2, h: 6, i: '21', type: 'chart', text: '计时器', comp: 'timeCounter' }
    // { x: 8, y: 2, w: 2, h: 2, i: '12', type: 'input', text: '自由上传文件', expend: false }
  ]
  ui.setLayoutColor(layout)
  layoutOrigin = JSON.parse(JSON.stringify(layout))
  const itemClassBuilder = (item) => {
    return [[item.type + 'Item', ui.aniControl(item, curActiveBtnI), 'btn']]
  }
  const recordMouseTime = () => {
    // console.log(`recordMouseTime`,);
    let time = new Date().getTime()
    mouseTime.value = time
    themeStore.setPressTime(time)
  }
  const handleItemClick = (i, item, e) => {
    let time = new Date().getTime()
    // console.log('mouse_time', mouseTime)
    // if (time - mouse_time >= 200) {
    if (time - mouseTime.value >= 200) {
      e.preventDefault()
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
  }
  const recoverSize = () => {
    layout.forEach((e, i) => {
      for (var key in e) {
        if (key == 'iconComp') return
        e[key] = layoutOrigin[i][key]
      }
    })
    // that.$refs.gridLayout.layoutUpdate
    gridLayoutR.value?.layoutUpdate()
  }
  const renderItem = (renderCompFn, lay) => {

    return lay.map(item => {
      return (
        <GridItem key={item.i} x={item.x} y={item.y} w={item.w} h={item.h} i={item.i} class={itemClassBuilder(item)} style={ui.gridItemStyle(item)} onMousedown={recordMouseTime} onMouseup={(e) => { handleItemClick(item.i, item, e); }} >
          {renderCompFn(item)}
          {/* <div>fuck</div> */}
        </GridItem>
      )
    })
  }
  return {
    gridConfig
    , layout
    , renderItem
    , recoverSize
  }
}