import { record_free, rmFile } from "@/apis"

export default function useSubmit() {
  const submitObj = {
    '自由上传文件': async (input, target) => {
      let nstr = input.split('\n')
      let data = {
        name_list: nstr
        , target: target.value
      }
      return await record_free(data)
    }
    , '删除文件': async (input, target) => {
      let nstr = input.replace(/\n/g, ',')
      return await rmFile({ fileName: nstr })
    }
  }

  return {
    submitObj
  }
}