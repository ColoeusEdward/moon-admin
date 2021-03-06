/*
 * @Author: your name
 * @Date: 2021-07-31 14:33:44
 * @LastEditTime: 2021-08-02 10:07:39
 * @LastEditors: your name
 * @Description:
 * @FilePath: \moon-admin\src\views\dash\simpleBtn.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { RecordRelease, Mp4Release, show_record, record_size_list, left_storage, rmFile, record_free, deploy, uploadTemp, rollBackVue, updateEcc, rebootLexue, gitPullOnedriveInedx } from '@/apis/index'

export default function useSimpleBtn() {
  const upLoadData = {}


  const recordRelease = async () => {
    // debugger
    await RecordRelease()
  }
  const mp4Release = async () => {
    // debugger
    await Mp4Release()
  }

  const get_record = async () => {
    // debugger
    let data: string = await show_record()
    let list: string[] = []
    data && (list = data.split('\n').slice(0, -1))
    return list
  }

  const getRecordSizeList = async () => {
    // debugger
    let data: string = await record_size_list()
    let list: string[] = []
    let tempList: string[][] = []
    data && (list = data.split('\n').slice(0, -1))

    list.forEach(e => {
      let le = e.split('\t')
      tempList.push(le)
    })
    // console.log("lsit", list,tempList)
    return tempList
  }

  const getLeftStore = async () => {
    let data: string = await left_storage()
    let list: string[] = []
    data && (list = data.split('\n').slice(0, -1))
    return list
  }

  const cmd = async () => {
    // debugger
    window.open('https://meamoe.ml:8666/')
  }

  const goGameNga = () => {
    window.open('https://bbs.nga.cn/thread.php?fid=414')
  }

  const goOneDrive = () => {
    window.open('https://meamoe.ml/mydrive/')
  }

  const goAria = () => {
    window.open('https://meamoe.ml/aria2/home/#!/downloading')
  }

  const goDownDir = () => {
    window.open('https://meamoe.ml/record/')
  }

  const goOldUp = () => {
    window.open('https://meamoe.ml/upload/upload.html')
  }

  const handleDeleteFile = async (inputStr) => {
    let nstr = inputStr.value.replace(/\n/g, ',')
    return await rmFile({ fileName: nstr })
  }

  const recordFree = async (inputStr, target) => {
    let nstr = inputStr.value.split('\n')
    let data = {
      name_list: nstr
      , target: target.value
    }
    return await record_free(data)
  }

  const handleUpload = (handleClick, mouse_time) => {
    let time = new Date().getTime()
    // console.log("handleDeployUpload",mouse_time)
    if (time - mouse_time >= 200) {
      return
    }
    handleClick()
  }

  const rollBackVueConfirm = (dialog) => {
    dialog.warning({
      title: '警告',
      content: '你确定？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        rollBackVue()
      },
      onNegativeClick: () => {

      }
    })
  }

  const eccUpdate = (dialog) => {
    dialog.warning({
      title: '警告',
      content: '你确定？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        updateEcc()
      },
      onNegativeClick: () => {

      }
    })
  }

  const deployUpload = async (fileList, i, progObj) => {
    let fileItem = fileList[0]
    let fdata = new FormData()
    // debugger
    fdata.append('files', fileItem.file)
    await deploy(fdata, (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      progObj[i] = percentCompleted
      // console.log(progObj);
    })
    // alert('部署成功')
  }
  const tempUpload = async (fileList, i, progObj) => {
    let fileItem = fileList[0]
    let fdata = new FormData()
    fdata.append('files', fileItem.file)
    await uploadTemp(fdata, (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      progObj[i] = percentCompleted
      // console.log(progObj);
    })
  }
  const handleUploadUdpate = (fileList, i, progObj) => {
    let list = [() => { }]
    list[12] = () => {
      deployUpload(fileList, i, progObj)
    }
    list[15] = () => tempUpload(fileList, i, progObj)
    list[i] && list[i]()
    fileList = []
    // let file = fileList[0]

  }

  const lexueReboot = (dialog) => {
    dialog.warning({
      title: '警告',
      content: '你确定？',
      positiveText: '确定',
      negativeText: '不确定',
      onPositiveClick: () => {
        rebootLexue()
      },
      onNegativeClick: () => {

      }
    })
  }

  const pullOnedriveInedx = () => {
    gitPullOnedriveInedx()
  }

  return {
    recordRelease,
    mp4Release
    , get_record
    , cmd
    , getRecordSizeList
    , getLeftStore
    , goGameNga
    , goOneDrive
    , goAria
    , handleDeleteFile
    , recordFree
    , handleUpload
    , handleUploadUdpate
    , upLoadData
    , goDownDir
    , goOldUp
    , rollBackVueConfirm
    , eccUpdate
    , lexueReboot
    , pullOnedriveInedx
  }
}

// export {
//   recordRelease
// }
