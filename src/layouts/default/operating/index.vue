<template>
  <div class="moon-operating">
    <div class="moon-operating__icon moon-operating__setting" @click="handleSettingDrawer">
      <n-icon size="22">
        <settings />
      </n-icon>
    </div>
    <div class="moon-operating__icon moon-operating__notify">
      <n-icon size="22">
        <alert16-regular />
      </n-icon>
    </div>
  </div>
  <moon-setting-drawer v-model:show-setting-drawer="showSettingDrawer" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Settings } from '@vicons/tabler'
  import { Alert16Regular } from '@vicons/fluent'
  import { NIcon } from 'naive-ui'
  import MoonSettingDrawer from '@/views/drawer/index.vue'
  import moonOperatingStyle from '@/layouts/default/operating/index.cssr'

  export default defineComponent({
    name: 'MoonOperating',
    components: { Settings, Alert16Regular, NIcon, MoonSettingDrawer },
    setup() {
      let showSettingDrawer = ref(false)

      moonOperatingStyle.mount()

      return {
        showSettingDrawer,
        handleSettingDrawer: () => {
          showSettingDrawer.value = !showSettingDrawer.value
        }
      }
    }
  })
</script>
