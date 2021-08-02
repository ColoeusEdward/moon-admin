/*
 * @Author: your name
 * @Date: 2021-07-31 14:33:44
 * @LastEditTime: 2021-08-02 10:07:39
 * @LastEditors: your name
 * @Description:
 * @FilePath: \moon-admin\src\views\dash\simpleBtn.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { RecordRelease, Mp4Release } from '@/apis/index'

export default function useSimpleBtn() {
  const recordRelease = async () => {
    // debugger
    await RecordRelease()
  }
  const mp4Release = async () => {
    // debugger
    await Mp4Release()
  }

  return {
    recordRelease,
    mp4Release
  }
}

// export {
//   recordRelease
// }
