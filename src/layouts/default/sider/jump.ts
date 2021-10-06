import { useRouter } from 'vue-router'
export default function userJump() {
  const router = useRouter()
  const routeList = {
    'table': '/tableInTable'
    , 'tsx': '/testJsx'
  }
  const handleChange = (key, item) => {
    console.log(key, item);
    routeList[key] && router.push({ path: routeList[key] })
  }

  return {
    handleChange
  }
}