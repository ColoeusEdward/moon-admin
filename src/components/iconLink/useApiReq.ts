import { gitPullOnedriveInedx, Mp4Release, rebootLexue, RecordRelease, record_free, rmFile, rollBackVue, updateEcc } from "@/apis"
import { useThemeStore } from "@/store/modules/theme"
const themeStore = useThemeStore()

export default function useApiReq() {
  const confirm = (api) => {
    themeStore.dialog!.warning({
      title: '警告',
      content: '你确定？',
      positiveText: `🤗🤗🤗`,
      negativeText: '不确定',
      onPositiveClick: () => {
        api()
      },
      onNegativeClick: () => {

      }
    })
  }
  const reqObj = {
    '释放式上传': () => {
      RecordRelease()
    }
    , '释放MP4': () => {
      Mp4Release()
    }
    , '更新证书': () => {
      confirm(updateEcc)
    }
    , '重启后端': () => {
      confirm(rebootLexue)
    }
    , '更新onedrive Index代码': () => {
      gitPullOnedriveInedx()
    }
    , '回退': () => {
      confirm(rollBackVue)
    }
  }

  return {
    reqObj
  }
}