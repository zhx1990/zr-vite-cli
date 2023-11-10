<template>
  <div id="base-map" ref="elRef" class="base-map w-full h-full">
    <LayoutMark />
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
import { onMounted, h, provide } from 'vue'
import { useMap } from '@/visualization/map'
import { LayoutMark } from '@/layouts'
import { useModal } from '@/hooks'
import dayjs from 'dayjs'
import { useRequest } from 'vue-request'
import { indexBuildingList } from '@/service'

const {
  cesiumRef,
  MAP_PROVIDE_KEY,

  // viewer
  viewer,
  createCompass,

  // layer
  LAYER_GROUP_IDS,
  htmlLayerGroup,
  geojsonLayerGroup,
  primitiveLayerGroup,
  tilesetLayerGroup,
  vectorLayerGroup,
  getLayer,
  getLayerGroupById,

  // overlay
  toggleOverlay,

  // map
  LAYER_IDS,
  measure,
  setupMap,
  setIsReady,
  destroy,
  changeBaseLayer,
  getCurrentDistance,
  getCurrentLngLat,
  siteMarkLayer,
  siteMarkLayerShowControl,
  flyToPosition,
  flyTo,
  zoomTo,
  zoomToPosition,
  zoomToCenter,
} = useMap()

provide(MAP_PROVIDE_KEY, {
  cesiumRef,

  // viewer
  viewer,
  createCompass,

  // layer
  LAYER_GROUP_IDS,
  htmlLayerGroup,
  geojsonLayerGroup,
  primitiveLayerGroup,
  tilesetLayerGroup,
  vectorLayerGroup,
  getLayer,
  getLayerGroupById,

  // overlay
  toggleOverlay,

  // map
  LAYER_IDS,
  measure,
  setupMap,
  setIsReady,
  destroy,
  changeBaseLayer,
  getCurrentDistance,
  getCurrentLngLat,
  siteMarkLayer,
  siteMarkLayerShowControl,
  flyToPosition,
  flyTo,
  zoomTo,
  zoomToPosition,
  zoomToCenter,
})

useRequest(indexBuildingList, {
  onSuccess: async (res) => {
    const d = res.map((item) => ({
      ...item,
      click: () => {
        console.log('item :>> ', item)
      },
    }))
    siteMarkLayer(d)
  },
})

onMounted(async () => {
  setupMap()
  zoomToCenter()
})
</script>
<style lang="scss" scoped>
.base-map {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
