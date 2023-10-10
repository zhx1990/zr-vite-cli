<template>
  <div class="flex justify-center items-center w-full absolute-bl z-1 pointer-events-auto">
    <BaseMapFooter />
  </div>
</template>
<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { BaseMapFooter } from '@/map/BaseMap'

const theme = useThemeStore()
</script>
<style lang="scss" scoped></style>
