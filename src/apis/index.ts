import { axios } from '../utils/request'

export function ip() {
  return axios({
    url: 'http://pv.sohu.com/cityjson?ie=utf-8',
    method: 'get'
  })
}
