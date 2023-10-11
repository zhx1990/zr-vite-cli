<template>
  <BaseCollapse :title="props.title" :empty="isEmpty(legendControlData)">
    <NSpace vertical>
      <NP v-for="item in legendControlData" :key="item.label" class="flex items-center">
        <BaseSvgIcon :local-icon="item.icon" class="mr-10px" />
        {{ item.label }}
      </NP>
    </NSpace>
  </BaseCollapse>
</template>
<script lang="ts" setup>
import { useMap } from '@/map'
import { isEmpty } from 'lodash'

const props = withDefaults(
  defineProps<{
    /* 标题 */
    title?: string
  }>(),
  {
    title: '地图选择',
  }
)

const { legendControlData } = useMap()
</script>
<style lang="scss" scoped></style>
