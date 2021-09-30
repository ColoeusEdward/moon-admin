<template>
  <div class="con">
    <n-spin :show="spinShow">
      <NDataTable :columns="columns" :data="data" :row-class-name="style.rowClass" :on-update:expandedRowKeys="eventHandle.handleExpendChange" :row-props="eventHandle.rowProp"></NDataTable>
    </n-spin>
  </div>
</template>

<script lang="ts">
export default {
  name: 'tableInTable'
}
</script>

<script setup lang="ts">
import { NDataTable, NSpin } from 'naive-ui'
import { ref, reactive, onMounted } from 'vue'
import tableData from './tableData'
import { myRowData, headerData } from './tableData'
import useStyle from './useStyle'
import useEvent from './useEvent'


const tdata = tableData()
const style = useStyle()
let data = reactive(tdata.data)
let columns = reactive(tdata.columns)
const spinShow = ref(false)


const props = defineProps({
  tbData: {
    type: Array
    , default: []
  },
  header: {
    type: Array
    , default: []
  }
})
if (props.tbData.length > 0) {
  data = reactive(props.tbData as myRowData[])
}
if (props.header.length > 0) {
  columns = reactive(props.header as headerData[])
}
const eventHandle = useEvent(data, spinShow, JSON.parse(JSON.stringify(columns)))


</script>

<style lang="scss" scoped>
:deep(.redRow) {
  td {
    color: red !important;
  }
}

:deep(.n-data-table-tr) {
  &:hover td {
    background-color: #18181c !important ;
  }
  &:hover > td {
    background-color: rgb(6, 86, 100) !important;
  }
  .n-data-table-td.n-data-table-td--last-col {
    padding: 2px 2px !important;
  }
}

:deep(.rowChoose) {
  td {
    background-color: #2a947d !important;
  }
}

// :deep(.redName) {
//   color: red !important;
// }
</style>