import request from '../utils/request'
import { AccData } from './BasicResponseModel'

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
    data: data
  })
}

export function record_free(data?) {
  return request<string>({
    url: '/koa/mv_upload/record_free',
    method: 'post',
    data: data
  })
}

export function deploy(data?, handleUploadEvent?) {
  return request<string>({
    url: '/koa/mv_upload/deploy',
    method: 'post',
    data: data
    , onUploadProgress: handleUploadEvent
  })
}

export function deploySun(data?, handleUploadEvent?) {
  return request<string>({
    url: '/koa/mv_upload/deploysun',
    method: 'post',
    data: data
    , onUploadProgress: handleUploadEvent
  })
}

export function memPercent(data?) {
  return request<string>({
    url: '/koa/mv_upload/memPercent',
    method: 'get',
    data: data
  })
}

export function uploadTemp(data?, handleUploadEvent?) {
  return request<string>({
    url: '/koa/mv_upload/uploadTemp',
    method: 'post',
    data: data
    , onUploadProgress: handleUploadEvent
  })
}

export function rollBackVue(data?) {
  return request<string>({
    url: '/koa/mv_upload/rollBackVue',
    method: 'get',
    data: data
  })
}

export function updateEcc(data?) {
  return request<string>({
    url: '/koa/newCen/updateEcc',
    method: 'get',
    data: data
  })
}

export function rebootLexue(data?) {
  return request<string>({
    url: '/koa/newCen/rebootLexue',
    method: 'get',
    data: data
  })
}

export function gitPullOnedriveInedx(data?) {
  return request<string>({
    url: '/koa/newCen/gitPullOnedriveInedx',
    method: 'get',
    data: data
  })
}

export function getAccountList(data?) {
  return request<string>({
    url: '/koa/newCen/getAccountList',
    method: 'get',
    data: data
  })
}

export function saveAccountList(data?) {
  return request<string>({
    url: '/koa/newCen/saveAccountList',
    method: 'post',
    data: data
  })
}

export function getAliRefreshToken(data?) {
  return request<string>({
    url: '/koa/newCen/free/getAliRefreshToken',
    method: 'get',
    data: data
  })
}

export function syncVideoToYou(data?) {
  return request<string>({
    url: '/koa/newCen/syncVideoToYou',
    method: 'post',
    data: data
  })
}

export function testIpc(data?) {
  return request<string>({
    url: '/koa/newCen/testIpc',
    method: 'post',
    data: data
  })
}

export function uploadBook(data?, handleUploadEvent?) {
  return request<string>({
    url: '/koa/mv_upload/uploadBook',
    method: 'post',
    data: data
    , onUploadProgress: handleUploadEvent
  })
}

export function getExistBook(data?) {
  return request<string[]>({
    url: '/koa/newCen/getExistBook',
    method: 'get',
    data: data
  })
}

export function getV8(data?) {
  return request<string>({
    url: '/koa/newCen/free/getV8',
    method: 'get',
    data: data
  })
}

export function getTB(data?) {
  return request<string>({
    url: '/koa/newCen/free/getTB',
    method: 'get',
    data: data
  })
}

export function getV8Comment(data?) {
  return request<object>({
    url: `/koa/newCen/free/getV8Comment/${data.tid}/${data.p}`,
    method: 'get',
    // data:data
  })
}

export function getTBComment(data?) {
  return request<object>({
    url: `/koa/newCen/free/getTBComment`,
    method: 'get',
    data: data
  })
}

export function getPageTBComment(data?) {
  return request<object>({
    url: `/koa/newCen/free/getPageTBComment`,
    method: 'get',
    data: data
  })
}

export function getV8Post(data?) {
  return request<string>({
    url: `/koa/newCen/free/getV8Post/${data.tid}/${data.p}`,
    method: 'get',
    // data:data
  })
}

export function getTBPost(data?) {
  return request<string>({
    url: `/koa/newCen/free/getTBPost`,
    method: 'get',
    data: data
  })
}

export function replyTB(data?) {
  return request<object>({
    url: `/koa/newCen/free/replyTB`,
    method: 'post',
    data: data
  })
}

export function replyComment(data?) {
  return request<object>({
    url: `/koa/newCen/free/replyComment`,
    method: 'post',
    data: data
  })
}

export function backupImg(data?) {
  return request<object>({
    url: `/koa/newCen/free/backupImg`,
    method: 'post',
    data: data
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