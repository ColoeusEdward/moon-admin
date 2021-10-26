import {left_storage, record_size_list } from "@/apis"

export default function useApiReq() {
  const reqObj = {
    '查看文件大小': async () => {
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
    , '查看剩余空间': async () => {
      let data: string = await left_storage()
      let list: string[] = []
      data && (list = data.split('\n').slice(0, -1))
      return list
    }
  }

  return {
    reqObj
  }
}