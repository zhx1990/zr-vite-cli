<template>
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
</template>
<script lang="ts" setup>
import { computed, h, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { useRouteStore, useThemeStore, useThreeStore } from '@/store'
import { translateMenuLabel } from '@/utils'
import { useRouterPush } from '@/hooks'
import type { IFooterSiteButtonPropsData } from './types'
import { FooterMenuButton, FooterSiteButton } from './components'

defineOptions({ name: 'BaseMapFooter' })

const route = useRoute()
const routeStore = useRouteStore()
const theme = useThemeStore()
const { routerPush } = useRouterPush()

const menus = computed(() => translateMenuLabel(routeStore.menus as App.GlobalMenuOption[]))
const activeKey = computed(
  () => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
)

const renderMenuLabel = (option: MenuOption) => h(FooterMenuButton as any, { label: option.label })

const handleUpdateMenu = (_key: string, item: MenuOption) => {
  const menuItem = item as App.GlobalMenuOption
  routerPush(menuItem.routePath)
}

const threeStore = useThreeStore()
const footerSiteButtonData: IFooterSiteButtonPropsData[] = [
  // {
  //   label: '永泰站',
  //   onClick() {
  //     console.log('永泰站')
  //   },
  // },
  {
    label: '福州站',
    onClick() {
      threeStore.setIsShowThree(true)
    },
  },
  // {
  //   label: '闽清站',
  // },
]

onMounted(() => {
  const els = document.querySelectorAll('.footer-menu-button') as NodeListOf<HTMLElement>
  els.forEach((el, index) => {
    // if (index === 1 || index === 3) {
    //   el.style.marginTop = '-40px'
    // }
    // if (index === 2) {
    //   el.style.marginTop = '-50px'
    // }

    if (index === 1) {
      el.style.marginTop = '-50px'
    }
  })
})
</script>
<style lang="scss" scoped>
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
  background: url('/images/systems/bg_nav_bottom.png') no-repeat;
  background-size: contain;
}
</style>
