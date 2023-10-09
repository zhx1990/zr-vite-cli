<template>
  <div class="marker-popup">
    <div class="marker-popup-head">
      <span>水库</span>
    </div>
    <BaseLoadingEmptyWrapper :loading="false">
      <div class="marker-popup-body">
        <NDescriptions label-placement="left" :column="1">
          <NDescriptionsItem label="安全状态">
            <NTag>--</NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="工程规模">
            <NTag>--</NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="坝体类型">
            <NTag>--</NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="当前水位">
            <NTag>--</NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="当前库容">
            <NTag>--</NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="设备数量">
            <NTag>--</NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="测点数量">
            <NTag>--</NTag>
          </NDescriptionsItem>
        </NDescriptions>
      </div>
      <div class="marker-popup-footer">
        <NButton long size="small"> 大坝安全监测 </NButton>
        <NButton long size="small"> 雨水情监测 </NButton>
      </div>
    </BaseLoadingEmptyWrapper>
  </div>
</template>
<script setup lang="ts">
import { NDescriptions, NDescriptionsItem, NButton, NTag } from 'naive-ui'
import { BaseLoadingEmptyWrapper } from '@/components/BaseLoadingEmptyWrapper'
import { isEmpty } from 'lodash'

interface PropsType {
  data: {
    id: string
    name: string
    legendType: number
    warnStatus: string
  }
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.marker-popup {
  width: 200px;

  .marker-popup-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 15px;
    font-weight: bold;
    color: rgb(var(--primary-6));

    .marker-popup-head-camera {
      font-size: 16px;
      color: rgb(var(--primary-6));
      cursor: pointer;
    }
  }

  .marker-popup-footer {
    display: flex;
    grid-gap: 4px;
    margin: 6px 0;
  }
}
</style>
