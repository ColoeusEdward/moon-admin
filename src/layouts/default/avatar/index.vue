<template>
  <div class="moon-avatar">
    <img class="moon-avatar__image" :src="avatarImage" alt="" />
    <div class="moon-avatar__user">
      <p>Stephen Austin</p>
      <p>Chief manager</p>
    </div>
    <n-icon class="moon-avatar__icon" size="35">
      <arrow-drop-down-round />
    </n-icon>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ArrowDropDownRound } from '@vicons/material'
  import { NIcon } from 'naive-ui'
  import Avatar from '@/assets/images/avatar.png'
  import moonAvatarStyle from '@/layouts/default/avatar/index.cssr'

  export default defineComponent({
    name: 'MoonAvatar',
    components: { ArrowDropDownRound, NIcon },
    setup() {
      moonAvatarStyle.mount()

      return {
        avatarImage: Avatar
      }
    }
  })
</script>

<style lang="scss" scoped></style>
