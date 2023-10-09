<template>
  <div
    class="global-header flex justify-center items-center w-full absolute-lt z-2 pointer-events-auto"
  >
    <BaseMapHeader />
  </div>
</template>
<script lang="ts" setup>
import { useThemeStore } from '@/store'

const theme = useThemeStore()
</script>
<style lang="scss" scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
