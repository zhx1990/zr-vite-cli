<template>
  <div id="base-map" ref="elRef" class="base-map w-full h-full">
    <div class="mask"></div>
    <div
      id="cesium-container"
      ref="cesiumRef"
      class="cesium-container relative wh-full overflow-hidden"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { useScreenZoom } from '@/hooks'
import { useMap } from '@/hooks/useCesium'

const { elRef, setDomZoom } = useScreenZoom()

const { MAP_PROVIDE_KEY, cesiumRef, destroy, setupCesium } = useMap()

provide(MAP_PROVIDE_KEY, {
  cesiumRef,
})

onUnmounted(() => {
  destroy()
})

onMounted(async () => {
  setupCesium()
  setDomZoom()
})
</script>
<style lang="scss" scoped>
.base-map {
  position: absolute;
  top: 0;
  left: 0;

  .mask {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: radial-gradient(circle, rgba(6, 68, 142, 0%) 0%, rgba(0, 20, 43, 100%) 100%);
  }
}
</style>
