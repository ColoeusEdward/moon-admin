import { h, VNode } from 'vue'
import { DataTableColumns } from 'naive-ui'
import { sleep } from '@/utils'
import { v4 as uuidv4 } from 'uuid'; // 导入uuid生成插件
type headerData = {
  key: string
  , title: string
  , className?: string
}
type baseData = {
  key: number
  , name: string
  , age: number
  , address: string
  , tags: string[]
  , hasChild: boolean
}
type childData = {
  child?: baseData[]
  , childHeader?: headerData[]
}
type myRowData = baseData & childData

export default function tableData() {
  let count = 10
  const columns: DataTableColumns<myRowData> = [
    // {
    //   type: 'expand',
    //   // expandable: (rowData, index) => { return !!(rowData.child && rowData.child!.length > 0) },
    //   expandable: (rowData, index) => { return rowData.hasChild },
    //   renderExpand: (rowData) => {
    //     let node: VNode | string = `暂无数据`
    //     if (rowData.child && rowData.child.length > 0) {
    //       node = h(
    //         tableInTable
    //         , {
    //           tbData: rowData.child
    //           , header: rowData.childHeader
    //         }
    //       )
    //     }
    //     return node
    //   }
    // },
    // {
    //   type: 'selection'
    // },
    {
      title: 'Name',
      key: 'name',
      className: 'redName'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
  ]

  const data: myRowData[] = [
    {
      key: 0,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
      , hasChild: true
    },
    {
      key: 1,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['wow']
      , hasChild: false
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
      , hasChild: false
    }
  ]

  const asyncData = async (myData) => {
    while (count--) {
      await sleep(1000)
      myData.push({
        key: uuidv4(),
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
        , hasChild: false
      })
    }
  }

  return {
    columns
    , data
    , asyncData
  }

}

export type { myRowData, headerData }
