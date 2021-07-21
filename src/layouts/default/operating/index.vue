<template>
  <div class="moon-operating">
    <div class="moon-operating__icon moon-operating__setting">
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
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Settings } from '@vicons/tabler'
  import { Alert16Regular } from '@vicons/fluent'
  import { NIcon } from 'naive-ui'
  import moonOperatingStyle from '@/layouts/default/operating/index.cssr'

  export default defineComponent({
    name: 'MoonOperating',
    components: { Settings, Alert16Regular, NIcon },
    setup() {
      moonOperatingStyle.mount()
    }
  })
</script>
