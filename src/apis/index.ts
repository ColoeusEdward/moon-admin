import request from '../utils/request'
import { BasicResponseModel } from './BasicResponseModel'

export function ip() {
  return request({
    url: 'http://pv.sohu.com/cityjson?ie=utf-8',
    method: 'get'
  })
}

export function RecordRelease() {
  return request({
    url: '/koa/mv_upload/record_release',
    method: 'get'
  })
}

export function Mp4Release() {
  return request({
    url: '/koa/mv_upload/record_release_mp4',
    method: 'get'
  })
}

export function show_record(data?) {
  return request<string>({
    url: '/koa/mv_upload/show_record',
    method: 'get'
  })
}

export function record_size_list(data?) {
  return request<string>({
    url: '/koa/mv_upload/record_size_list',
    method: 'get'
  })
}

export function left_storage(data?) {
  return request<string>({
    url: '/koa/mv_upload/left_storage',
    method: 'get'
  })
}

export function rmFile(data?) {
  return request<string>({
    url: '/koa/mv_upload/rmFile',
    method: 'post',
    data:data
  })
}

export function record_free(data?) {
  return request<string>({
    url: '/koa/mv_upload/record_free',
    method: 'post',
    data:data
  })
}



// 'POST /mv_upload/record_free': record_free,
//   'GET /mv_upload/record_release': record_release,
//   'GET /mv_upload/record_release_mp4': record_release_mp4,
//   'POST /mv_upload/to_mp4': to_mp4,
//   'POST /mv_upload/rmFile': rmFile,
//   'GET /mv_upload/show_record': show_record,
//   'GET /mv_upload/record_size_list': record_size_list,
//   'GET /mv_upload/left_storage': left_storage,
