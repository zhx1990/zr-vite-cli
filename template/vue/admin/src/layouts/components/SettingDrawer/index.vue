<template>
  <NDrawer
    :show="app.settingDrawerVisible"
    display-directive="show"
    :width="330"
    @mask-click="app.closeSettingDrawer"
  >
    <NDrawerContent title="主题配置" :native-scrollbar="false">
      <DarkMode />
      <LayoutMode />
      <ThemeColorSelect />
      <PageFunc />
      <PageView />
      <ThemeConfig />
    </NDrawerContent>
  </NDrawer>
  <DrawerButton v-if="showButton" />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import {
  DarkMode,
  DrawerButton,
  LayoutMode,
  PageFunc,
  PageView,
  ThemeColorSelect,
  ThemeConfig,
} from './components'

defineOptions({ name: 'SettingDrawer' })

const app = useAppStore()

const showButton = import.meta.env.DEV || import.meta.env.VITE_VERCEL === 'Y'
</script>

<style scoped></style>
