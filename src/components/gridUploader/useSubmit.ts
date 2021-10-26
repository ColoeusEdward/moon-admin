import { record_free, rmFile, deploy, uploadTemp } from "@/apis"

export default function useSubmit() {
  const api = {
    '部署': deploy
    , '上传至temp': uploadTemp
  }
  const submit = async (fileList, item, progObj) => {
    let fileItem = fileList[0]
    let fdata = new FormData()
    // debugger
    fdata.append('files', fileItem.file)
    await api[item.text](fdata, (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      progObj[item.i] = percentCompleted
      // console.log(progObj);
    })
  }


  return {
    submit
  }
}