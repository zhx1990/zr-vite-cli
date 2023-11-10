<template>
  <BaseMap ref="map">
    <Widget />
  </BaseMap>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { LEGEND_TYPE_1, getLegendTypeByValue } from '@/config'
import { BaseMap } from '@/visualization/map/BaseMap'
import Widget from './Widget/Widget.vue'
import Marker from './Marker/Marker.vue'

const map = ref<any>('map')

const sitePointData = [
  {
    id: '1706203223616528385',
    bdName: '水库',
    lng: 118.11,
    lat: 27.79,
    type: 1,
    legendType: 3,
  },
]

onMounted(() => {
  map.value.setLegendControlData(LEGEND_TYPE_1)
  map.value.setLayerControlData(sitePointData.map((item) => getLegendTypeByValue(item.legendType)))
  map.value.sitePointLayer({
    data: sitePointData,
    component: Marker,
  })
})
</script>
<style lang="scss" scoped></style>
