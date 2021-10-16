import request from '../utils/request'
type loginRes = {
  Bearer:string
  ,token:string
}

export function login(data?) {
  return request<loginRes>({
    url: '/koa/mv_upload/login',
    method: 'post'
    ,data:data
  })
}