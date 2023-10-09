<template>
  <ContentHeader />
  <ContentMap />
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
</template>
<script lang="ts" setup>
import { useRouteStore, useThemeStore } from '@/store'
import { ContentHeader, ContentMap } from './components'

const routeStore = useRouteStore()
const theme = useThemeStore()
</script>
<style lang="scss" scoped></style>
