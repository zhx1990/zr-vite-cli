<template>
  <BaseDarkModeContainer
    class="global-header flex-y-center h-full"
    :inverted="theme.header.inverted"
  >
    <LayoutLogo
      v-if="showLogo"
      :show-title="true"
      class="h-full"
      :style="{ width: theme.sider.width + 'px' }"
    />
    <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
      <MenuCollapse v-if="showMenuCollapse || isMobile" />
      <GlobalBreadcrumb v-if="theme.header.crumb.visible && !isMobile" />
    </div>
    <HeaderMenu v-else />
    <div class="flex justify-end h-full">
      <LayoutSearch />
      <!-- <GithubSite /> -->
      <FullScreen />
      <ThemeMode />
      <!-- <ToggleLang /> -->
      <!-- <SystemMessage /> -->
      <!-- <SettingButton v-if="showButton" /> -->
      <UserAvatar />
    </div>
  </BaseDarkModeContainer>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
import { useBasicLayout } from '@/hooks'
import LayoutLogo from '../LayoutLogo/index.vue'
import LayoutSearch from '../LayoutSearch/index.vue'
import {
  FullScreen,
  GithubSite,
  GlobalBreadcrumb,
  HeaderMenu,
  MenuCollapse,
  SettingButton,
  SystemMessage,
  ThemeMode,
  UserAvatar,
  ToggleLang,
} from './components'

defineOptions({ name: 'LayoutHeader' })

interface Props {
  /** 显示logo */
  showLogo: App.GlobalHeaderProps['showLogo']
  /** 显示头部菜单 */
  showHeaderMenu: App.GlobalHeaderProps['showHeaderMenu']
  /** 显示菜单折叠按钮 */
  showMenuCollapse: App.GlobalHeaderProps['showMenuCollapse']
}

defineProps<Props>()

const theme = useThemeStore()
const { isMobile } = useBasicLayout()

const showButton = import.meta.env.PROD && import.meta.env.VITE_VERCEL !== 'Y'
</script>

<style scoped>
.global-header {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
../LayoutSearch/index.vue
