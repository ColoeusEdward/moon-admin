import { record_free, rmFile, deploy, uploadTemp, uploadBook } from "@/apis"
import { sleep } from "@/utils"

export default function useSubmit(uploadRef) {
  const api = {
    '部署': deploy
    , '上传至temp': uploadTemp
    , '上传book': uploadBook
  }
  const submit = async (fileList, item, progObj) => {
    let fileItem = fileList[0]
    let fdata = new FormData()
    // debugger
    fdata.append('files', fileItem.file)
    const resetPersent = async (progObjItem) => {
      await sleep(1000)
      progObjItem = 0
      uploadRef.value.clear()
    }
    await api[item.text](fdata, (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      progObj[item.i] = percentCompleted
      if(percentCompleted==100){
        resetPersent(progObj[item.i])
      }
      // console.log(progObj);
    })
  }


  return {
    submit
  }
}