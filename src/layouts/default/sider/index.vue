<template>
  <!--  <div class="moon-sider-container">-->
  <NMenu @update:value="jump.handleChange" :options="menuOptions" v-bind="{ ...menuProps }" :collapsed="collapsed" />
  <!--  </div>-->
</template>

<script setup lang="ts">
import { NMenu, NIcon } from 'naive-ui'
// import moonSiderStyle from './index.cssr'
import { h, ref, inject } from 'vue'
import {BookOne,People,Drink,DataFile,FrenchFries} from '@icon-park/vue-next'
import useJump from './jump'

const jump = useJump()

let collapsed: any = inject('collapsed')


function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuProps = {
  collapsedWidth: 64,
  collapsedIconSize: 22,
}
// moonSiderStyle.mount()

const menuOptions = [
  {
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookOne),
    href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199'
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(DataFile),
    children: [
      {
        label: '无限嵌套表格',
        key: 'table'
      }
      ,{
        label: 'tsx页面',
        key: 'tsx'
      }
      ,{
        label: 'echart页面',
        key: 'echart'
      }
      ,{
        label: '旧dash',
        key: 'oldDash'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'v8',
    icon: renderIcon(FrenchFries)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookOne),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(People)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(People)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(Drink),
        children: [
          {
            label: '威士忌',
            key: 'whisky',
            href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
</script>
