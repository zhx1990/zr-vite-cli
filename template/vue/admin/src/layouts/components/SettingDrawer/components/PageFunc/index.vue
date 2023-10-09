<template>
  <NDivider title-placement="center">界面功能</NDivider>
  <NSpace vertical size="large">
    <SettingMenu label="滚动模式">
      <NSelect
        class="w-120px"
        size="small"
        :value="theme.scrollMode"
        :options="theme.scrollModeList"
        @update:value="theme.setScrollMode"
      />
    </SettingMenu>
    <SettingMenu label="固定头部和多页签">
      <NSwitch :value="theme.fixedHeaderAndTab" @update:value="theme.setIsFixedHeaderAndTab" />
    </SettingMenu>
    <SettingMenu label="顶部菜单位置">
      <NSelect
        class="w-120px"
        size="small"
        :value="theme.menu.horizontalPosition"
        :options="theme.menu.horizontalPositionList"
        @update:value="theme.setHorizontalMenuPosition"
      />
    </SettingMenu>
    <SettingMenu label="头部高度">
      <NInputNumber
        class="w-120px"
        size="small"
        :value="theme.header.height"
        :step="1"
        @update:value="theme.setHeaderHeight"
      />
    </SettingMenu>
    <SettingMenu label="多页签高度">
      <NInputNumber
        class="w-120px"
        size="small"
        :value="theme.tab.height"
        :step="1"
        @update:value="theme.setTabHeight"
      />
    </SettingMenu>
    <SettingMenu label="多页签缓存">
      <NSwitch :value="theme.tab.isCache" @update:value="theme.setTabIsCache" />
    </SettingMenu>
    <SettingMenu label="侧边栏展开宽度">
      <NInputNumber
        class="w-120px"
        size="small"
        :value="theme.sider.width"
        :step="10"
        @update:value="theme.setSiderWidth"
      />
    </SettingMenu>
    <SettingMenu label="左侧混合侧边栏展开宽度">
      <NInputNumber
        class="w-120px"
        size="small"
        :value="theme.sider.mixWidth"
        :step="5"
        @update:value="theme.setMixSiderWidth"
      />
    </SettingMenu>
    <!-- <SettingMenu label="显示底部">
      <NSwitch :value="theme.footer.visible" @update:value="theme.setFooterVisible" />
    </SettingMenu>
    <SettingMenu label="固定底部">
      <NSwitch :value="theme.footer.fixed" @update:value="theme.setFooterIsFixed" />
    </SettingMenu>
    <SettingMenu label="底部居右">
      <NSwitch :value="theme.footer.right" @update:value="theme.setFooterIsRight" />
    </SettingMenu> -->
  </NSpace>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store'
import SettingMenu from '../SettingMenu/index.vue'

defineOptions({ name: 'PageFunc' })

const theme = useThemeStore()
</script>

<style scoped></style>
