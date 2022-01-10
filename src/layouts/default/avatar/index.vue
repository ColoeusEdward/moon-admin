<template>
  <div class="moon-avatar">
    <img class="moon-avatar__image" :src="avatarImage" alt="" />
    <div class="moon-avatar__user">
      <p>Stephen Austin</p>
      <p>Chief manager</p>
    </div>
    <n-icon class="moon-avatar__icon" size="35">
      <down-c />
    </n-icon>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {DownC} from '@icon-park/vue-next'
  import { NIcon } from 'naive-ui'
  import Avatar from '@/assets/images/avatar.png'
  import moonAvatarStyle from '@/layouts/default/avatar/index.cssr'

  export default defineComponent({
    name: 'MoonAvatar',
    components: { NIcon, DownC },
    setup() {
      moonAvatarStyle.mount()

      return {
        avatarImage: Avatar
      }
    }
  })
</script>

<style lang="scss" scoped></style>
