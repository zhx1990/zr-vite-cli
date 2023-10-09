<template>
  <BaseNaiveUiConfigProvider>
    <BaseNaiveProvider>
      <FsUiContext>
        <RouterView />
      </FsUiContext>
    </BaseNaiveProvider>
  </BaseNaiveUiConfigProvider>
</template>

<script setup lang="ts">
import { subscribeStore, useThemeStore } from '@/store'
import { useGlobalEvents } from '@/hooks'

subscribeStore()
useGlobalEvents()
</script>

<style scoped></style>
