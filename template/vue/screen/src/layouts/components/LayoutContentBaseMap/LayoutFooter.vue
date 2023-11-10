<template>
  <div class="flex justify-center items-center absolute-bl z-4 footer-container">
    <div class="base-map-footer flex-1 h-90px">
      <NMenu
        class="wh-full flex-center"
        :value="activeKey"
        mode="horizontal"
        :options="menus"
        :inverted="theme.header.inverted"
        :render-label="renderMenuLabel"
        @update:value="handleUpdateMenu"
      />
      <FooterSiteButton :data="footerSiteButtonData" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useThemeStore, useRouteStore, useThreeStore } from '@/store'

import { computed, h, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { translateMenuLabel } from '@/utils'
import { useRouterPush } from '@/hooks'
import type { IFooterSiteButtonPropsData } from './types'
import { FooterMenuButton, FooterSiteButton } from './components'

const route = useRoute()
const routeStore = useRouteStore()
const theme = useThemeStore()
const { routerPush } = useRouterPush()

const menus = computed(() => translateMenuLabel(routeStore.menus as App.GlobalMenuOption[]))
const activeKey = computed(
  () => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
)

const renderMenuLabel = (option: MenuOption) =>
  h(FooterMenuButton as any, {
    label: option.label,
    imgPath: option.imgPath,
    imgActivePath: option.imgActivePath,
  })

const handleUpdateMenu = (_key: string, item: MenuOption) => {
  const menuItem = item as App.GlobalMenuOption
  routerPush(menuItem.routePath)
}

const threeStore = useThreeStore()
const footerSiteButtonData: IFooterSiteButtonPropsData[] = [
  {
    label: '全景',
    onClick() {
      // threeStore.setIsShowThree(true)
    },
    imgPath: '/images/systemsNew/pic1.png',
  },
  {
    label: '大坝工程',
    onClick() {
      threeStore.setIsShowThree(true)
    },
    imgPath: '/images/systemsNew/pic2.png',
  },
  {
    label: '大坝内观',
    onClick() {
      // threeStore.setIsShowThree(true)
    },
    imgPath: '/images/systemsNew/pic3.png',
  },
  {
    label: '机房',
    onClick() {
      // threeStore.setIsShowThree(true)
    },
    imgPath: '/images/systemsNew/pic4.png',
  },
  {
    label: '管理楼',
    onClick() {
      // threeStore.setIsShowThree(true)
    },
    imgPath: '/images/systemsNew/pic5.png',
  },
]
</script>
<style lang="scss" scoped>
.footer-container {
  left: 50%;
  width: 50%;
  margin-left: -25%;
}

:deep(.n-menu) {
  overflow: initial;
}

:deep(.n-menu-item-content-header) {
  overflow: inherit !important;
}

:deep(.n-menu.n-menu--horizontal .n-menu-item-content) {
  padding: 0 10px;
  border-bottom: none;
}

.base-map-footer {
  position: relative;
  background: url('/images/systemsNew/bg_nav_bottom.png') no-repeat center;
  background-size: contain;
}
</style>
