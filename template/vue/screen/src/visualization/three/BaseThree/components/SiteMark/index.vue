<template>
  <div class="site-mark">
    <NConfigProvider :theme-overrides="themeOverrides">
      <NTooltip trigger="hover">
        <template #trigger>
          <SiteMark v-bind="props" />
        </template>
        <SiteMarkTip v-bind="props" />
      </NTooltip>
    </NConfigProvider>
  </div>
</template>
<script lang="ts" setup>
import { NTooltip, NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import SiteMark from './SiteMark.vue'
import SiteMarkTip from './SiteMarkTip.vue'

const themeOverrides: GlobalThemeOverrides = {
  Tooltip: {
    color: 'rgba(1,1,1,0)',
    boxShadow: 'none',
  },
}

const props = defineProps<{
  id: string
  bdName: string
  legendType: number
  bdCode: string
  warnStatus?: number
  isOffsetBottom?: boolean
}>()
</script>
<style lang="scss" scoped></style>
