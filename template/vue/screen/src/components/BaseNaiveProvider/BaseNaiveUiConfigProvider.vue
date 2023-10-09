<template>
  <NConfigProvider
    :theme="darkTheme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <slot></slot>
  </NConfigProvider>
</template>
<script lang="ts" setup>
import {
  type NConfigProvider,
  type GlobalThemeOverrides,
  dateZhCN,
  zhCN,
  darkTheme,
} from 'naive-ui'
import { useThemeStore } from '@/store'
import themeJson from '@/settings/naive-ui-theme-overrides.json'

const theme = useThemeStore()
const themeOverrides = { ...theme.naiveThemeOverrides, ...themeJson }
</script>
<style lang="scss" scoped></style>
