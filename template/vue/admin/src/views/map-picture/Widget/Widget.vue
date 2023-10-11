<template>
  <BaseMapWidget>
    <template #left> </template>
    <template #right>
      <SliderPanels :configs="panelData" />
    </template>
  </BaseMapWidget>
</template>
<script lang="ts" setup>
import { SliderPanels,BaseMapWidget } from '@/map/BaseMap'
import { shallowRef } from 'vue'
import Overview from './components/Overview.vue'
import MonitorSafe from './components/MonitorSafe.vue'
import RealWater from './components/RealWater/RealWater.vue'
import RealRain from './components/RealRain/RealRain.vue'

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
  {
    icon: 'reservoir-quyongshuihu',
    label: '实时雨情',
    value: 'RealRain',
    component: shallowRef(RealRain),
  },
]
</script>
<style lang="scss" scoped></style>
