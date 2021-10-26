import { RecordRelease, record_free, rmFile } from "@/apis"

export default function useApiReq() {
  const reqObj = {
    '释放式上传':() => {
      RecordRelease()
    }
  }

  return {
    reqObj
  }
}