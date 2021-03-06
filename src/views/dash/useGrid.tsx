
import { ref, reactive, nextTick } from 'vue';
import { Refresh } from '@icon-park/vue-next'
import { GridItem } from 'vue3-grid-layout'
import useUi from './ui'
import './grid.scss'
import { useThemeStore } from '@/store/modules/theme';
import { sleep } from '@/utils';
import { iconUrl } from './icon';

const themeStore = useThemeStore()
const ui = useUi()

export default function useGrid(gridLayoutR) {
  let layoutOrigin
  let animationId = 0
  const curActiveBtnI = ref('-1')
  const curClickBtnI = ref('-1')
  const mouseTime = ref(0)
  const gridConfig = {
    draggable: true,
    resizable: true,
    compact: true
    // ,responsive:true
  }
  const layout = reactive([
    { x: 0, y: 0, w: 1, h: 3, i: '0', type: 'btn', text: '释放式上传', src: 'https://img.icons8.com/dusk/100/000000/upgrade.png' },
    { x: 1, y: 0, w: 1, h: 3, i: '1', type: 'btn', text: '释放MP4', src: 'https://img.icons8.com/color/100/000000/video.png' },
    { x: 4, y: 0, w: 1, h: 3, i: '2', type: 'icon', text: '命令行', src: 'https://img.icons8.com/dusk/100/000000/command-line.png', link: 'https://meamoe.ml:8666/' },
    { x: 5, y: 0, w: 1, h: 3, i: '11', type: 'icon', text: 'aria2', src: 'https://raw.githubusercontent.com/mayswind/AriaNg-Native/master/assets/AriaNg.ico', link: 'https://meamoe.ml/aria2/home/#!/downloading' },
    { x: 6, y: 0, w: 2, h: 3, i: '3', type: 'syncToYou', text: '上传视频至youtube', src: 'https://img.icons8.com/fluency/96/000000/youtube-play.png' },
    { x: 7, y: 6, w: 2, h: 3, i: '4', type: 'input', text: '自由上传文件', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/upload.png' },
    { x: 10, y: 0, w: 1, h: 3, i: '12', type: 'upload', text: '部署', src: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/deployment-2369058-1978336.png' },
    { x: 11, y: 0, w: 1, h: 3, i: '5', type: 'iconbtn', text: '复原', iconComp: () => <Refresh /> },
    { x: 0, y: 3, w: 2, h: 4, i: '6', type: 'list', text: '查看剩余空间', src: 'https://icons-for-free.com/iconfiles/png/512/storage+dropbox+dropbox+logo+file+storage+file+transfer+upload-1320196083387888656.png' },
    { x: 2, y: 0, w: 2, h: 3, i: '7', type: 'input', text: '删除文件', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/delete-sign.png' },
    { x: 4, y: 3, w: 2, h: 4, i: '8', type: 'list', text: '查看文件大小', src: 'https://icons-for-free.com/iconfiles/png/512/file+format+mp4+paper+icon-1320167130956649663.png' },
    { x: 6, y: 3, w: 1, h: 3, i: '9', type: 'icon', text: '游踪', src: 'https://img.icons8.com/color/100/000000/controller.png', link: 'https://bbs.nga.cn/thread.php?fid=414' },
    { x: 7, y: 3, w: 1, h: 3, i: '10', type: 'icon', text: 'onedrive网盘', src: 'https://img.icons8.com/clouds/150/000000/skydrive.png', link: 'https://meamoe.ml/mydrive/' }
    , { x: 10, y: 3, w: 1, h: 3, i: '13', type: 'icon', text: '下载文件夹', src: 'https://img.icons8.com/dusk/100/000000/download.png', link: 'https://meamoe.ml/record/' }
    , { x: 8, y: 0, w: 2, h: 6, i: '14', type: 'chart', comp: 'memPercent' }
    , { x: 2, y: 3, w: 1, h: 3, i: '15', type: 'upload', text: '上传至temp', src: 'https://img.icons8.com/plasticine/200/000000/add-folder.png' }
    , { x: 11, y: 3, w: 1, h: 3, i: '16', type: 'icon', text: '老upup', src: 'https://img.icons8.com/dusk/128/000000/home.png', link: 'https://meamoe.ml/upload/upload.html' }
    , { x: 11, y: 6, w: 1, h: 3, i: '17', type: 'btn', text: '回退', src: 'https://img.icons8.com/bubbles/2x/undo.png' }
    , { x: 0, y: 7, w: 1, h: 3, i: '18', type: 'btn', text: '更新证书', src: 'https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/100/000000/external-certificate-award-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png' }
    , { x: 6, y: 6, w: 1, h: 3, i: '19', type: 'btn', text: '重启后端', src: 'https://img.icons8.com/bubbles/100/000000/restart.png' }
    , { x: 3, y: 3, w: 1, h: 3, i: '20', type: 'btn', text: '更新onedrive Index代码', src: 'https://img.icons8.com/color/144/000000/git.png' }
    , { x: 2, y: 6, w: 2, h: 6, i: '21', type: 'chart', text: '计时器', comp: 'timeCounter' }
    , { x: 4, y: 6, w: 2, h: 4, i: '22', type: 'accList', text: 'ap', src: 'https://img.icons8.com/external-flatarticons-blue-flatarticons/100/000000/external-account-ux-and-ui-flatarticons-blue-flatarticons.png', expend: false, },
    { x: 9, y: 6, w: 2, h: 3, i: '23', type: 'weather', text: '天气', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/upload.png' }
    , { x: 1, y: 7, w: 1, h: 3, i: '24', type: 'icon', text: 'book', src: 'https://img.icons8.com/dusk/64/000000/literature.png', link: 'https://meamoe.ml/site/up/bookPage' }
    , { x: 6, y: 7, w: 1, h: 3, i: '25', type: 'upload', text: '上传book', src: 'https://img.icons8.com/color/96/000000/book-reading.png' }
    , { x: 7, y: 8, w: 4, h: 1.5, i: '26', type: 'google', text: '谷歌', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/upload.png' }
    , { x: 7, y: 9.5, w: 4, h: 1.5, i: '27', type: 'backImg', text: '保存涩图', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/upload.png' }
    , { x: 11, y: 8, w: 1, h: 3, i: '28', type: 'upload', text: '部署sun', src: 'https://img.icons8.com/bubbles/100/undefined/react.png' }
    // { x: 8, y: 6, w: 2, h: 3, i: '4', type: 'syncToYou', text: '上传视频至youtube', expend: false, src: 'https://img.icons8.com/bubbles/100/000000/upload.png' },
    // { x: 8, y: 2, w: 2, h: 2, i: '12', type: 'input', text: '自由上传文件', expend: false }
  ])
  ui.setLayoutColor(layout)
  layoutOrigin = JSON.parse(JSON.stringify(layout))
  const itemClassBuilder = (item) => {
    return [[item.type + 'Item', ui.aniControl(item, curActiveBtnI), 'btn']]
  }
  const recordMouseTime = (i) => {
    // console.log(`recordMouseTime`,);
    curClickBtnI.value = i
    let time = new Date().getTime()
    mouseTime.value = time
    themeStore.setPressTime(time)
  }
  const handleItemClick = async (i, item, e) => {
    let time = new Date().getTime()
    animationId && window.clearTimeout(animationId)
    curActiveBtnI.value = '-1'
    // console.log('mouse_time', mouseTime)
    // if (time - mouse_time >= 200) {
    if (time - mouseTime.value >= 200) {
      // e.preventDefault()
      return
    }
    await sleep(30) //强制等待, 确保curActiveBtnI值的修改被渲染至dom
    console.log('i', i)

    curActiveBtnI.value = i

    animationId = window.setTimeout(() => {
      curActiveBtnI.value = '-1'
    }, 400)

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
        <GridItem key={item.i} x={item.x} y={item.y} w={item.w} h={item.h} i={item.i} class={itemClassBuilder(item)} style={ui.gridItemStyle(item)} onMousedown={() => { recordMouseTime(item.i) }} onMouseup={(e) => { handleItemClick(item.i, item, e); }} >
          {renderCompFn(item, curClickBtnI)}
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