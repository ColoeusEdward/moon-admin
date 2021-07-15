import { defineComponent, unref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Refresh',
  setup() {
    const { currentRoute, replace } = useRouter()
    const { params, query, path } = unref(currentRoute)

    params[`__stamp-${path}`] = Date.now().toString()
    replace({
      params: params,
      query: query,
      path: path
    })
  }
})
