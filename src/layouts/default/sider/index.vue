<template>
  <!--  <div class="moon-sider-container">-->
  <NMenu :options="menuOptions" v-bind="{ ...menuProps }" :collapsed="collapsed" />
  <!--  </div>-->
</template>

<script setup lang="ts">
import { NMenu, NIcon } from 'naive-ui'
// import moonSiderStyle from './index.cssr'
import { h, ref,inject } from 'vue'

import { BookOutline as BookIcon, PersonOutline as PersonIcon, WineOutline as WineIcon } from '@vicons/ionicons5'

let collapsed:any = inject('collapsed')


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
    icon: renderIcon(BookIcon),
    href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199'
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
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
