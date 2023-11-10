<template>
  <LayoutThree class="contentThree" :class="isShowThree ? 'z-4!' : 'z-3!'" />
  <LayoutMap class="contentMap">
    <RouterView v-if="!isShowThree && isReady" v-slot="{ Component, route }">
      <Transition :name="theme.pageAnimateMode" mode="out-in" :appear="true">
        <KeepAlive :include="routeStore.cacheRoutes">
          <component
            :is="Component"
            :key="route.fullPath"
            class="flex-grow transition duration-300 ease-in-out"
          />
        </KeepAlive>
      </Transition>
    </RouterView>
  </LayoutMap>
  <LayoutHeader class="pointer-events-none" />
  <LayoutFooter v-show="!isShowThree" />
</template>
<script lang="ts" setup>
import gsap from 'gsap'
import { useRouteStore, useThemeStore, useThreeStore } from '@/store'
import { reactive, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { isReady } from '~/src/visualization/map'

import { LayoutHeader, LayoutMap, LayoutFooter, LayoutThree } from './index'

const threeStore = useThreeStore()
const routeStore = useRouteStore()
const theme = useThemeStore()
const { isShowThree } = storeToRefs(threeStore)

watch(
  () => isShowThree.value,
  (val) => {
    if (val) {
      gsap.to('.contentThree', { opacity: 1, duration: 1 })
    } else {
      gsap.to('.contentThree', { opacity: 0, duration: 1 })
    }
  },
  { immediate: true, deep: true }
)
</script>
<style lang="scss" scoped>
.contentThree {
  opacity: 0;
}
</style>
