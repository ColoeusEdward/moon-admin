import { record_free, rmFile, deploy, uploadTemp, uploadBook, deploySun } from "@/apis"
import { sleep } from "@/utils"

export default function useSubmit(uploadRef) {
  const api = {
    '部署': deploy
    , '上传至temp': uploadTemp
    , '上传book': uploadBook
    , '部署sun':deploySun
  }
  const submit = async (fileList, item, progObj) => {
    // console.log("🚀 ~ file: useSubmit.ts ~ line 11 ~ submit ~ fileList", fileList)
    let fileItem = fileList[0]
    let fdata = new FormData()
    // debugger
    fdata.append('files', fileItem.file)
    const resetPersent = async (i) => {
      await sleep(1000)
      progObj[i] = 0
      uploadRef.value.clear()
      // console.log("🚀 ~ file: useSubmit.ts ~ line 19 ~ resetPersent ~ uploadRef.value", uploadRef.value)
    }
    await api[item.text](fdata, (progressEvent) => {
      // console.log("🚀 ~ file: useSubmit.ts ~ line 22 ~ submit ~ progressEvent", progressEvent)
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      progObj[item.i] = percentCompleted
      if (percentCompleted == 100) {
        resetPersent(item.i)
      }
      // console.log(progObj);
    })
  }


  return {
    submit
  }
}