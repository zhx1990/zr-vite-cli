<template>
  <NTabs type="line" animated>
    <NTabPane name="监测数据">
      <MonitoringData />
    </NTabPane>
    <NTabPane name="河道断面">
      <RiverData />
    </NTabPane>
    <NTabPane name="测站信息">
      <StationData />
    </NTabPane>
  </NTabs>
</template>
<script lang="ts" setup>
import MonitoringData from './MonitoringData.vue'
import RiverData from './RiverData.vue'
import StationData from './StationData.vue'
</script>
<style lang="scss" scoped>
:deep(.n-tabs-tab__label) {
  font-size: 16px;
}
</style>
