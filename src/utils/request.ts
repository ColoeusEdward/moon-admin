import axios, { AxiosRequestConfig } from 'axios'
import define from '@/utils/define'
import { BasicResponseModel,baseData } from './../apis/BasicResponseModel';
declare global {
  interface Window {
    $msg?: any
  }
}

console.log('import.meta.env.PROD', import.meta.env.PROD)
const service = axios.create({

  timeout: 10000,
  baseURL: define.APIURl, // url = base url + request url
  withCredentials: false // send cookies when cross-domain requests
})

const err = (error: any) => {
  return Promise.reject(error)
}

service.interceptors.request.use((config: any) => {
  // console.log(config)
  if (config.method == 'get') {
    config.params = config.data
  }
  return config
}, err)

service.interceptors.response.use((response: any) => {
  // console.log(response)
  if (response.data.code !== 200) {
    window.$msg && window.$msg.error(response.msg || 'Error')
    return Promise.reject(new Error(response.msg || 'Error'))
  } else {
    window.$msg && window.$msg.success('操作成功')
    let res: BasicResponseModel = response
    return res.data
  }
  // return response.data
}, err)

const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => { //自定义response类型
  try {
    const {data} = await service.request<T>(config)
    
    // data.code === 0
    //   ? console.log('操作成功') // 成功消息提示
    //   : console.error(data.msg) // 失败消息提示
    return data
  } catch (err) {
    return null as any
    // return {
    //   code: -1,
    //   msg:err.msg,
    //   data: null as any
    // }
  }
}

export default request
export { service }
