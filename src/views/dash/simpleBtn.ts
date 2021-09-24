/*
 * @Author: your name
 * @Date: 2021-07-31 14:33:44
 * @LastEditTime: 2021-08-02 10:07:39
 * @LastEditors: your name
 * @Description:
 * @FilePath: \moon-admin\src\views\dash\simpleBtn.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { RecordRelease, Mp4Release, show_record, record_size_list, left_storage } from '@/apis/index'

export default function useSimpleBtn() {
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
      // console.log("e.split('\t')", e.split('\t'))
      let le = e.split('\t')
      tempList.push(le)
      // let idx = e.search('K')//先找字符k
      // idx == -1 && (idx = e.search('M'))//k找不到再找M
      // if (idx!=-1) {

      // }
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

  return {
    recordRelease,
    mp4Release
    , get_record
    , cmd
    , getRecordSizeList
    , getLeftStore
    , goGameNga
  }
}

// export {
//   recordRelease
// }
