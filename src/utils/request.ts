import axios from 'axios'
import define from '@/utils/define'

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
    return response.data
  }
  // return response.data
}, err)

export { service as axios }
