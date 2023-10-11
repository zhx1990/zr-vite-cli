<template>
  <BaseMapWidget>
    <template #left> </template>
    <template #right>
      <BaseSliderPanels :configs="panelData" />
    </template>
  </BaseMapWidget>
</template>
<script lang="ts" setup>
import { shallowRef } from 'vue'
import { BaseMapWidget } from '@/map/BaseMap'
import Overview from './components/Overview.vue'
import MonitorSafe from './components/MonitorSafe.vue'
import RealWater from './components/RealWater/RealWater.vue'

const panelData = [
  {
    icon: 'reservoir-shishishujuzhanshi',
    label: '水库概览',
    value: 'Overview',
    component: shallowRef(Overview),
  },
  {
    icon: 'reservoir-shuiligongchengxinxitongji',
    label: '大坝安全监测',
    value: 'MonitorSafe',
    component: shallowRef(MonitorSafe),
  },
  {
    icon: 'reservoir-tangyanbagongcheng',
    label: '实时水情',
    value: 'RealWater',
    component: shallowRef(RealWater),
  },
]
</script>
<style lang="scss" scoped></style>
