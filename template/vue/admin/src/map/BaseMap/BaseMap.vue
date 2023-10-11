<template>
  <div
    id="cesium-container"
    ref="cesiumRef"
    class="cesium-container relative wh-full overflow-hidden"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { useMap } from '@/map'
import { onUnmounted, onMounted, provide } from 'vue'

const { MAP_PROVIDE_KEY, cesiumRef, destroy, setupCesium } = useMap()

provide(MAP_PROVIDE_KEY, {
  cesiumRef,
})
onMounted(() => {
  setupCesium()
})

onUnmounted(() => {
  destroy()
})
</script>
<style lang="scss" scoped></style>
