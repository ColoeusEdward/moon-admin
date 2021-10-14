const APIURl = 'https://meamoe.ml'
const root = '/site/up/'
const wsUrl = 'wss://meamoe.ml'

export default {
  APIURl
  ,root
  ,wsUrl
}



//旧define

// const APIURl = 'https://cloud.newtopiot.com'
// const timeout = process.env.NODE_ENV === 'development' ? 10000 : 1000000
// const WebSocketUrl = process.env.NODE_ENV === 'development' ? 10000 : 1000000
// const comUploadUrl = process.env.VUE_APP_BASE_API + '/api/Common/Uploader'
// const comUrl = process.env.VUE_APP_BASE_API
// const localUrl = 'http://localhost:3000/dev'
// const dataV = process.env.NODE_ENV === 'development' ? 'http://localhost:8100/DataV' : process.env.VUE_APP_BASE_API + '/DataV'
// const reportServer = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : process.env.VUE_APP_BASE_API + '/ReportServer'
// const report = process.env.NODE_ENV === 'development' ? 'http://localhost:8200' : process.env.VUE_APP_BASE_API + '/Report'
// export {
//   APIURl,
//   timeout
// }