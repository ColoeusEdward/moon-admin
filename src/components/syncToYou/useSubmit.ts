import { record_free, rmFile, syncVideoToYou } from "@/apis"

export default function useSubmit() {
  const submitObj = {
    '自由上传文件': async (input, target) => {
      let nstr = input.split('\n')
      let data = {
        name_list: nstr
        , target: target
      }
      return await record_free(data)
    }
    , '删除文件': async (input, target) => {
      let nstr = input.replace(/\n/g, ',')
      return await rmFile({ fileName: nstr })
    }
  }
  const submit = async (spin, form) => {
    console.log("🚀 ~ file: useSubmit.ts ~ line 19 ~ submit ~ form", form)
    spin.value = true
    await syncVideoToYou(form)
    spin.value = false
  }

  return {
    submitObj
    , submit
  }
}