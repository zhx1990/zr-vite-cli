<template>
  <LayoutContentBaseMap v-if="showBaseMap" />
  <RouterView v-else v-slot="{ Component, route }">
    <Transition
      :name="theme.pageAnimateMode"
      mode="out-in"
      :appear="true"
      @before-leave="app.setDisableMainXScroll(true)"
      @after-enter="app.setDisableMainXScroll(false)"
    >
      <KeepAlive :include="routeStore.cacheRoutes">
        <Component
          :is="Component"
          v-if="app.reloadFlag"
          :key="route.fullPath"
          :class="{ 'p-16px': !showBaseMap }"
          class="flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out"
        />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<script setup lang="ts">
import { useAppStore, useRouteStore, useThemeStore } from '@/store'
import { LayoutContentBaseMap } from '../index'

defineOptions({ name: 'LayoutContent' })

interface Props {
  showBaseMap?: boolean
}

withDefaults(defineProps<Props>(), {
  showBaseMap: false,
})

const app = useAppStore()
const theme = useThemeStore()
const routeStore = useRouteStore()
</script>

<style scoped></style>
