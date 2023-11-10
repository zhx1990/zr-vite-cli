<template>
  <BaseCollapse :title="props.title" :loading="bool">
    <NGrid :y-gap="5" :cols="1">
      <NGi class="grid gap-10px grid-cols-2">
        <NTag size="small" :bordered="false" type="primary"> 比例尺 </NTag>
        <NTag size="small" :bordered="false" type="primary"> {{ params.distance }} </NTag>
      </NGi>
      <NGi class="grid gap-10px grid-cols-2">
        <NTag size="small" :bordered="false" type="primary"> 经度 </NTag>
        <NTag size="small" :bordered="false" type="primary"> {{ params.lng }} </NTag>
      </NGi>
      <NGi class="grid gap-10px grid-cols-2">
        <NTag size="small" :bordered="false" type="primary"> 纬度</NTag>
        <NTag size="small" :bordered="false" type="primary"> {{ params.lat }}</NTag>
      </NGi>
    </NGrid>
  </BaseCollapse>
</template>
<script lang="ts" setup>
import { useMap } from '@/visualization/map'
import { onMounted, reactive, onUnmounted, watch, inject } from 'vue'
import * as Cesium from '@cesium/engine'
import { useBoolean } from '@/hooks'

const props = withDefaults(
  defineProps<{
    /* 标题 */
    title?: string
  }>(),
  {
    title: '地图参数',
  }
)

const { MAP_PROVIDE_KEY } = useMap()
const map = inject(MAP_PROVIDE_KEY)

const { bool, setFalse } = useBoolean(true)

const geodesic = new Cesium.EllipsoidGeodesic()
const params = reactive({
  distance: '0',
  lng: 0,
  lat: 0,
})
const onCameraChange = () => {
  const { lng, lat } = map!.getCurrentLngLat()
  params.lng = Number(lng.toFixed(2))
  params.lat = Number(lat.toFixed(2))
  params.distance = map!.getCurrentDistance(geodesic)
}
const unwatch = watch(
  () => map!.viewer.value,
  (val) => {
    if (val) {
      map!.viewer.value?.on(DC.SceneEventType.CAMERA_CHANGED, onCameraChange)
      onCameraChange()
      setFalse()
      unwatch()
    }
  }
)

onUnmounted(() => {
  map?.viewer.value?.off(DC.SceneEventType.CAMERA_CHANGED, onCameraChange)
})
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-gap: 6px;

  .item {
    display: flex;
    align-items: center;
    font-size: 12px;

    span:first-child {
      height: 24px;
      padding: 0 10px;
      margin-right: 6px;
      font-size: 12px;
      line-height: 22px;
      background-color: var(--color-fill-2);
      border-color: transparent;
    }
  }
}
</style>
