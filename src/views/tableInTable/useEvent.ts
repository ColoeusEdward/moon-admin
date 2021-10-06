import { sleep } from "@/utils";
import { myRowData } from "./tableData";
import { Ref } from "@vue/reactivity";
import { v4 as uuidv4 } from 'uuid'; // 导入uuid生成插件
import { useTableStore } from '@/store/modules/table'


export default function useEvent(data: myRowData[], spinShow: Ref<boolean>, columns) {
  let curExpItem: myRowData | undefined
  const tableStore = useTableStore()
  const handleExpendChange = (e) => {
    // console.log('',);
    console.log('e', e);
    if (e.length > 0) {
      let key = e[0]
      let item = data.find((e) => {
        return e.key == key
      })
      // console.log('data', data);
      // console.log('item', item);
      curExpItem = item

      sendRequest()
    }
  }

  const sendRequest = async () => {
    console.log(`send request width key:${curExpItem?.key}`,);
    spinShow.value = true
    await sleep(1000)
    spinShow.value = false
    curExpItem!.child = [{
      key: uuidv4(),
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
      , hasChild: true
    }, {
      key: uuidv4(),
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
      , hasChild: true
    },
    {
      key: uuidv4(),
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
      , hasChild: true
    }]
    // curExpItem!.childHeader = [{
    //   title: 'Name',
    //   key: 'name',
    //   className: 'redName'
    // },
    // {
    //   title: 'Age',
    //   key: 'age'
    // },
    // {
    //   title: 'fuckckkck',
    //   key: 'address'
    // },]

  }

  const handleRowClick = (keys) => {
    console.log(`keys`, keys);
  }

  const rowProp = (rowData, rowIndex) => {
    return {
      onClick: () => {
        tableStore.curRowKey = rowData.key
        console.log(`tableStore.curRowKey`, tableStore.curRowKey);
      }
    }
  }
  return {
    handleExpendChange
    , sendRequest
    , handleRowClick
    , rowProp
  }
}
