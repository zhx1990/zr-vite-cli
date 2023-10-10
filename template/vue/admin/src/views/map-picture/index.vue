<template>
  <BaseMap>
    <Widget />
  </BaseMap>
</template>
<script lang="ts" setup>
import { useMap } from '@/map'
import { onMounted } from 'vue'
import { LEGEND_TYPE_1, getLegendTypeByValue } from '@/config'
import Widget from './Widget/Widget.vue'
import Marker from './Marker/Marker.vue'

const { createSitePoint, setLegendControlData, setLayerControlData } = useMap()

const sitePointData = [
  {
    id: '1706203223616528385',
    tenantId: '1562271616227143683',
    orgId: '1686910603511529472',
    projectName: '四明湖水库',
    resCode: '1898',
    lng: 119,
    lat: 26,
    type: 1,
    legendType: 3,
    picture: '1706203218621112321',
    ln: 3,
    warnStatus: 1,
    rainData: {
      deviceId: 'YL-004',
      createdTime: '2023-09-25T16:00:00',
      rain: 1.97,
      sixHour: 8.78,
      twelveHour: 15.52,
      total: 10.57,
    },
  },
  {
    id: '1706203223616528385',
    tenantId: '1562271616227143683',
    orgId: '1686910603511529472',
    projectName: '四明湖水库',
    resCode: '1898',
    lng: 119.01,
    lat: 26.01,
    type: 1,
    legendType: 3,
    picture: '1706203218621112321',
    ln: 3,
    warnStatus: 1,
    rainData: {
      deviceId: 'YL-004',
      createdTime: '2023-09-25T16:00:00',
      rain: 1.97,
      sixHour: 8.78,
      twelveHour: 15.52,
      total: 10.57,
    },
  },
  {
    id: '1706203223616528385',
    tenantId: '1562271616227143683',
    orgId: '1686910603511529472',
    projectName: '四明湖水库',
    resCode: '1898',
    lng: 119.02,
    lat: 26.02,
    type: 1,
    legendType: 2,
    picture: '1706203218621112321',
    ln: 3,
    warnStatus: 1,
    rainData: {
      deviceId: 'YL-004',
      createdTime: '2023-09-25T16:00:00',
      rain: 1.97,
      sixHour: 8.78,
      twelveHour: 15.52,
      total: 10.57,
    },
  },
]

onMounted(() => {
  setLegendControlData(LEGEND_TYPE_1)
  setLayerControlData(sitePointData.map((item) => getLegendTypeByValue(item.legendType)))
  createSitePoint({
    data: sitePointData,
    component: Marker,
  })
})
</script>
<style lang="scss" scoped></style>
