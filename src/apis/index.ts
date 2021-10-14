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

export function deploy(data?) {
  return request<string>({
    url: '/koa/mv_upload/deploy',
    method: 'post',
    data:data
  })
}

export function memPercent(data?) {
  return request<string>({
    url: '/koa/mv_upload/memPercent',
    method: 'get',
    data:data
  })
}

export function uploadTemp(data?) {
  return request<string>({
    url: '/koa/mv_upload/uploadTemp',
    method: 'post',
    data:data
  })
}

export function rollBackVue(data?) {
  return request<string>({
    url: '/koa/mv_upload/rollBackVue',
    method: 'get',
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


/*
 * @Author: your name
 * @Date: 2021-10-14 00:40:13
 * @LastEditTime: 2021-10-14 00:49:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /lexue/mixin/ws.js
 */


// const buildWs = (io) => {
//   io.on('connection', socket => {
//     console.log('ws on connect');
//     socket.on("data", (arg) => {
//       console.log(arg); // world
//     });

//     socket.emit('hello', 'world')

//     socket.on('start', () => {
//       if (!timer) {
//         timer = new Timer(28800000)
//       }
//       timer.count()
//       socket.emit('start_res', '计时已开始');
//     });

//     socket.on('stop', () => {
//       let res = ''
//       if (timer) {
//         timer.stop()
//         res = '已停止计时'
//       } else {
//         res = '计时器不存在'
//       }
//       socket.emit('stop_res', res);
//     });

//     socket.on('reset', () => {
//       let res = ''
//       if (timer) {
//         timer.reset()
//         res = '已重置计时'
//       } else {
//         res = '计时器不存在'
//       }
//       socket.emit('reset_res', res);
//     });

//     socket.on('get_time', () => {
//       let res = ''
//       if (timer) {
//         res = timer.total_time
//       } else {
//         res = 0
//       }
//       socket.emit('get_time_res', res);
//     });

//     socket.on('getMem', () => {
//       let res = ''
//       let res = child_process.execSync(`free -h`, {
//         encoding: 'UTF-8'
//       })
//       let list = res.split('\n')[1].split(`       `)
//       const getNum = (str) => {
//         return str.slice(0, -2) * 1
//       }
//       let ret = [getNum(list[2]), getNum(list[3]) + getNum(list[5])]
//       socket.emit('getMem', ret);
//     });

//     socket.on('disconnect', () => {
//       console.log('socket disconnect'); // the Set contains at least the socket ID
//     });
//   });
//   io.listen(3100);
// }

// module.exports = {
//   buildWs
// }