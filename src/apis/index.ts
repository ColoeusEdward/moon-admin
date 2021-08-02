import { axios } from '../utils/request'

export function ip() {
  return axios({
    url: 'http://pv.sohu.com/cityjson?ie=utf-8',
    method: 'get'
  })
}

export function RecordRelease() {
  return axios({
    url: '/koa/mv_upload/record_release',
    method: 'get'
  })
}

export function Mp4Release() {
  return axios({
    url: '/koa/mv_upload/record_release_mp4',
    method: 'get'
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
