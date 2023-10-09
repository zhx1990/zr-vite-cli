<template>
  <div class="statistics">
    <BaseStatistic
      index="0"
      label="平均降雨量:"
      unit="mm"
      icon="reservoir reservoir-shuiziyuan"
      :value="dataSource?.avgDrp"
    />
    <BaseStatistic
      index="1"
      label="降雨站点:"
      unit="个"
      icon="reservoir reservoir-shuiziyuan"
      :value="dataSource?.count"
    />
    <BaseStatistic
      index="2"
      label="最大降雨量:"
      unit="mm"
      icon="reservoir reservoir-shuiziyuan"
      :value="dataSource?.maxDrp"
    />
    <BaseStatistic
      index="3"
      label="降雨最大测站:"
      icon="reservoir reservoir-shuiziyuan"
      :value="dataSource?.maxBuildingName"
    />
  </div>
</template>
<script setup lang="ts">
import { BaseStatistic } from '@/components/BaseStatistic'

const dataSource = {
  avgDrp: '-',
  count: '-',
  maxDrp: '-',
  maxBuildingName: '-',
}
</script>
<style lang="scss" scoped>
.statistics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-bottom: 10px;

  .statistics-item {
    padding: 10px;
    font-size: 12px;
    color: #fff;
    border-radius: var(--border-radius-small);

    .value {
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
