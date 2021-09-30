import { defineStore } from 'pinia'
import { myRowData } from '@/views/tableInTable/tableData'

type tableState = {
  curTableRow: myRowData | {}
  curRowKey: string | number
}

export const useTableStore = defineStore({
  id: 'table',
  state: (): tableState => ({
    curTableRow: {}
    , curRowKey: -1
  }),
  getters: {
  },
  actions: {}
})
