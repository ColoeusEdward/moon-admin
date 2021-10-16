import { login } from '@/apis/user'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
export default function userEvent(msg,router) {
  const handleLogin = async (name,psw,spinShow) => {
    if (!(name.value && psw.value)) {
      return
    }
    let data = {
      name: name.value
      , psw: psw.value
    }
  
    spinShow.value = true
    let res = await login(data)
    spinShow.value = false
    if (res) {
      msg.success('登录成功')
      userStore.setToken(res.token)
      router.push({ path: '/' })
      return
    }
    msg.error('登录失败')
    // localStorage.setItem('token', 'mock-token')
    // router.push({ path: 'home' })
  }
  return {
    handleLogin
  }
}