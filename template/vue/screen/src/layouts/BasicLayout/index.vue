<template>
  <LayoutAdmin
    :mode="mode"
    :is-mobile="isMobile"
    :scroll-mode="theme.scrollMode"
    :scroll-el-id="app.scrollElId"
    :full-content="app.contentFull"
    :fixed-top="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :content-class="app.disableMainXScroll ? 'overflow-x-hidden' : ''"
    :header-visible="headerVisible"
    :sider-visible="siderVisible"
    :sider-collapse="app.siderCollapse"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :footer-visible="theme.footer.visible"
    :fixed-footer="theme.footer.fixed"
    :right-footer="theme.footer.right"
    @click-mobile-sider-mask="app.setSiderCollapse(true)"
  >
    <template #header> </template>
    <template #tab> </template>
    <template #sider> </template>
    <LayoutContent :show-base-map="true" />
    <template #footer> </template>
  </LayoutAdmin>
  <NBackTop :key="theme.scrollMode" :listen-to="`#${app.scrollElId}`" class="z-100" />
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store'
import { useBasicLayout } from '@/hooks'
import { LayoutAdmin } from '../components/LayoutAdmin'
import { LayoutContent } from '../components'

defineOptions({ name: 'BasicLayout' })

const app = useAppStore()
const theme = useThemeStore()

const {
  mode,
  isMobile,
  headerProps,
  headerVisible,
  siderVisible,
  siderWidth,
  siderCollapsedWidth,
} = useBasicLayout()
</script>

<style lang="scss">
#__SCROLL_EL_ID__ {
  @include scrollbar(8px, #e1e1e1);
}

.dark #__SCROLL_EL_ID__ {
  @include scrollbar(8px, #555);
}
</style>
