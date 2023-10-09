<template>
  <ContentMap />
  <!-- <VScaleScreen
    id="v-scale-screen"
    width="1920"
    height="1080"
    class="pointer-events-none"
    :delay="0"
  > -->
  <ContentHeader />
  <ContentFooter />
  <RouterView v-slot="{ Component, route }">
    <Transition :name="theme.pageAnimateMode" mode="out-in" :appear="true">
      <KeepAlive :include="routeStore.cacheRoutes">
        <component
          :is="Component"
          :key="route.fullPath"
          class="flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out"
        />
      </KeepAlive>
    </Transition>
  </RouterView>
  <!-- </VScaleScreen> -->
</template>
<script lang="ts" setup>
import VScaleScreen from 'v-scale-screen'
import { useRouteStore, useThemeStore } from '@/store'
import { ContentHeader, ContentMap, ContentFooter } from './components'

const routeStore = useRouteStore()
const theme = useThemeStore()
</script>
<style lang="scss" scoped></style>
