/*
 * @Author: your name
 * @Date: 2021-07-31 14:33:44
 * @LastEditTime: 2021-08-02 10:07:39
 * @LastEditors: your name
 * @Description:
 * @FilePath: \moon-admin\src\views\dash\simpleBtn.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { RecordRelease, Mp4Release, show_record, record_size_list, left_storage, rmFile, record_free, deploy } from '@/apis/index'

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

  const deployUpload = async (fileList) => {
    let fileItem = fileList[0]
    let fdata = new FormData()
    // debugger
    fdata.append('files', fileItem.file)
    await deploy(fdata)
  }
  const handleUploadUdpate = (fileList, i) => {
    let list = [() => { }]
    list[12] = () => {
      deployUpload(fileList)
    }
    list[i] && list[i]()
    fileList = []
    // let file = fileList[0]

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
  }
}

// export {
//   recordRelease
// }
