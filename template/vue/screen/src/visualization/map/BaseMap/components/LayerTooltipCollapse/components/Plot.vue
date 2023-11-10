<template>
  <NSpace>
    <BaseHoverContainer
      v-for="(item, index) in props.data"
      :key="index"
      :tooltipContent="item.tipLabel"
      @click="item.onClick"
    >
      <component :is="item.icon" class="text-22px hover:text-blue" />
    </BaseHoverContainer>
  </NSpace>
</template>
<script lang="ts" setup>
import { IBaseLayerTooltipCollapsePlotData } from '../types'

const props = defineProps<{
  data: IBaseLayerTooltipCollapsePlotData[]
}>()
</script>
<style lang="scss" scoped></style>
