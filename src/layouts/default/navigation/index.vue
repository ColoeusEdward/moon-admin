<template>
  <div class="moon-navigation">
    <slot name="navigation">
      <div class="moon-navigation__path">Overview</div>
      <div class="moon-navigation__userinfo">
        <div>
          <n-icon size="22">
            <ios-settings />
          </n-icon>
        </div>
        <div>
          <n-icon size="22">
            <alert16-regular />
          </n-icon>
        </div>
        <div>
          <img :src="avatarImage" alt="">
          <div>
            <p>Stephen Austin</p>
            <p>Chief manager</p>
          </div>
          <n-icon size="22">
            <alert16-regular />
          </n-icon>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IosSettings } from '@vicons/ionicons4'
import { Alert16Regular } from '@vicons/fluent'
import Avatar from '@/assets/images/avatar.png'

export default defineComponent({
  name: 'MoonNavigation',
  components: { IosSettings, Alert16Regular },
  setup() {
    return {
      avatarImage: Avatar
    }
  }
})
</script>

<style lang="scss" scoped></style>
