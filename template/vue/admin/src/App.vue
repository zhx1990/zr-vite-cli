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
import { dateZhCN, zhCN } from 'naive-ui'
import { subscribeStore, useThemeStore } from '@/store'
import { useGlobalEvents } from '@/hooks'

const theme = useThemeStore()

subscribeStore()
useGlobalEvents()
</script>

<style scoped></style>
