/*
 * @Author: your name
 * @Date: 2021-07-30 16:52:02
 * @LastEditTime: 2021-07-30 16:52:03
 * @LastEditors: your name
 * @Description:
 * @FilePath: \moon-admin\src\apis\BasicResponseModel.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

export interface BasicResponseModel<T = any> {
  code: number
  message: string
  result: T
}
export interface BasicPageParams {
  pageNumber: number
  pageSize: number
  total: number
}
