<template>
  <NDivider title-placement="center">界面显示</NDivider>
  <NSpace vertical size="large">
    <SettingMenu label="面包屑">
      <NSwitch :value="theme.header.crumb.visible" @update:value="theme.setHeaderCrumbVisible" />
    </SettingMenu>
    <SettingMenu label="面包屑图标">
      <NSwitch
        :value="theme.header.crumb.showIcon"
        @update:value="theme.setHeaderCrumbIconVisible"
      />
    </SettingMenu>
    <SettingMenu label="多页签">
      <NSwitch :value="theme.tab.visible" @update:value="theme.setTabVisible" />
    </SettingMenu>
    <SettingMenu label="多页签风格">
      <NSelect
        class="w-120px"
        size="small"
        :value="theme.tab.mode"
        :options="theme.tab.modeList"
        @update:value="theme.setTabMode"
      />
    </SettingMenu>
    <SettingMenu label="页面切换动画">
      <NSwitch :value="theme.page.animate" @update:value="theme.setPageIsAnimate" />
    </SettingMenu>
    <SettingMenu label="页面切换动画类型">
      <NSelect
        class="w-120px"
        size="small"
        :value="theme.page.animateMode"
        :options="theme.page.animateModeList"
        @update:value="theme.setPageAnimateMode"
      />
    </SettingMenu>
  </NSpace>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store'
import SettingMenu from '../SettingMenu/index.vue'

defineOptions({ name: 'PageView' })

const theme = useThemeStore()
</script>

<style scoped></style>
