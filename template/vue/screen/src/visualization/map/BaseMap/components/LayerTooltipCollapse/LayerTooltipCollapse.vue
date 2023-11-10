<template>
  <NPopover placement="left" trigger="hover" style="padding: 0; background: none">
    <template #trigger>
      <LayerTooltipCollapseButton :img-path="props.imgPath" :label="props.label" />
    </template>
    <BaseCardPanel
      :title="props.panelTitle"
      :loading="props.loading"
      :empty="props.empty"
      class="text-18px"
    >
      <slot></slot>
    </BaseCardPanel>
  </NPopover>
</template>
<script lang="ts" setup>
import { LayerTooltipCollapseButton } from '../index'
import type { IBaseLayerTooltipCollapsePanelProps } from './types'

const props = defineProps<IBaseLayerTooltipCollapsePanelProps & {}>()
</script>
<style lang="scss" scoped>
:deep(.n-popover-shared .n-popover-arrow-wrapper .n-popover-arrow) {
  background-color: #015396;
}
</style>
