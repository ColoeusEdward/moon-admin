
import { useTableStore } from '@/store/modules/table'

export default function userStyle() {
  const tableStore = useTableStore()
  const rowClassName = 'redRow'

  const rowClass = (rowData) => {
    if (rowData.key == tableStore.curRowKey) {
      return 'rowChoose'
    }
  }
  return {
    rowClass
    , rowClassName
  }
}
