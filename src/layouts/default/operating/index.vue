<template>
  <div class="moon-operating">
    <div class="moon-operating__icon moon-operating__setting" @click="handleSettingDrawer">
      <n-icon size="22">
        <config />
      </n-icon>
    </div>
    <div class="moon-operating__icon moon-operating__notify">
      <n-icon size="22">
        <volume-notice />
      </n-icon>
    </div>
  </div>
  <moon-setting-drawer />
</template>

<script lang="ts">
  import { defineComponent, ref, provide } from 'vue'
  import {Config,VolumeNotice} from '@icon-park/vue-next'
  import { NIcon } from 'naive-ui'
  import MoonSettingDrawer from '@/views/drawer/index.vue'
  import moonOperatingStyle from '@/layouts/default/operating/index.cssr'

  export default defineComponent({
    name: 'MoonOperating',
    components: { NIcon, MoonSettingDrawer,Config,VolumeNotice },
    setup() {
      const showSettingDrawer = ref(false)

      moonOperatingStyle.mount()
      const handleSettingDrawer = () => {
        showSettingDrawer.value = !showSettingDrawer.value
      }

      provide('showSettingDrawer', showSettingDrawer)

      return {
        showSettingDrawer,
        handleSettingDrawer
      }
    }
  })
</script>
