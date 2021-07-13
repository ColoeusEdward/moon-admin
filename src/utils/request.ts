import axios from 'axios'

const service = axios.create({
  timeout: 6000
})

const err = (error: any) => {
  return Promise.reject(error)
}

service.interceptors.request.use((config: any) => {
  console.log(config)
  return config
}, err)

service.interceptors.response.use((response: any) => {
  console.log(response)
  return response.data
}, err)

export { service as axios }
