<template>
  <BaseDarkModeContainer
    class="global-header flex justify-center items-center h-15 w-full relative z-1"
    :inverted="theme.header.inverted"
  >
    <div class="">Header</div>
    <!-- <layout-header :show-header-menu="true" :show-logo="true" :show-menu-collapse="true" /> -->
  </BaseDarkModeContainer>
</template>
<script lang="ts" setup>
import { useThemeStore } from '@/store'
import layoutHeader from '../../LayoutHeader/index.vue'

const theme = useThemeStore()
</script>
<style lang="scss" scoped></style>
