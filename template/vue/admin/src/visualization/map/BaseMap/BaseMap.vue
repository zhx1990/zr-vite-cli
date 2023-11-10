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
import { useMap } from '@/visualization/map'
import { onUnmounted, onMounted, provide } from 'vue'

const {
  MAP_PROVIDE_KEY,
  cesiumRef,

  // viewer
  viewer,

  // controlData
  layerControlData,
  legendControlData,
  tileControlData,
  setLegendControlData,
  setLayerControlData,

  // layer
  LAYER_GROUP_IDS,
  LAYER_IDS,
  htmlLayerGroup,
  geojsonLayerGroup,
  primitiveLayerGroup,
  tilesetLayerGroup,
  vectorLayerGroup,
  getLayer,
  getLayerGroupById,

  // overlay
  toggleOverlay,
  sitePointLayer,

  // map
  setupMap,
  setIsReady,
  destroy,
  changeBaseLayer,
  getCurrentDistance,
  getCurrentLngLat,
  sceneSplit,
  flyToPosition,
  flyTo,
  zoomToCenter,
  zoomTo,
  zoomToPosition,
  readyCesium,
} = useMap()

provide(MAP_PROVIDE_KEY, {
  cesiumRef,

  // viewer
  viewer,

  // controlData
  layerControlData,
  legendControlData,
  tileControlData,
  setLegendControlData,
  setLayerControlData,

  // layer
  LAYER_GROUP_IDS,
  LAYER_IDS,
  htmlLayerGroup,
  geojsonLayerGroup,
  primitiveLayerGroup,
  tilesetLayerGroup,
  vectorLayerGroup,
  getLayer,
  getLayerGroupById,

  // overlay
  toggleOverlay,
  sitePointLayer,

  // map
  setupMap,
  setIsReady,
  destroy,
  changeBaseLayer,
  getCurrentDistance,
  getCurrentLngLat,
  sceneSplit,
  flyToPosition,
  flyTo,
  zoomToCenter,
  zoomTo,
  zoomToPosition,
  readyCesium,
})

defineExpose({
  setLegendControlData,
  setLayerControlData,
  sitePointLayer,
})
onMounted(() => {
  setupMap()
  zoomToCenter()
})

onUnmounted(() => {
  destroy()
})
</script>
<style lang="scss" scoped></style>
