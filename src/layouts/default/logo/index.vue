<template>
  <div class="moon-logo" @click="goDash">
    <img class="moon-logo__image" :src="logo" alt />
    <span class="moon-logo__name">MoonAdmin</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {useRouter} from 'vue-router'
import Logo from '@/assets/images/logo.webp'
import moonLogoStyle from '@/layouts/default/logo/index.cssr'

export default defineComponent({
  name: 'MoonLogo',
  setup() {
    moonLogoStyle.mount()

    const router = useRouter()
    const goDash = () => {
      router.push({path:'/dash'})
    }

    return {
      logo: Logo
      ,goDash
    }
  }
})
</script>
