<template>
  <div class="statistics">
    <BaseStatistic
      index="0"
      label="库水位:"
      unit="m"
      icon="reservoir reservoir-shuiziyuan"
      :value="dataSource?.avgDrp"
    />
    <BaseStatistic
      index="1"
      label="汛限水位:"
      unit="m"
      icon="reservoir reservoir-shuiziyuan"
      :value="dataSource?.count"
    />
    <BaseStatistic
      index="2"
      label="当前库容:"
      unit="10"
      icon="reservoir reservoir-shuiziyuan"
      :value="dataSource?.maxDrp"
    />
    <BaseStatistic
      index="3"
      label="库容比:"
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
