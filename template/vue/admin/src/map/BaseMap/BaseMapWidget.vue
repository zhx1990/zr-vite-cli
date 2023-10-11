<template>
  <div class="base-map-widget" :class="offsetTopClass">
    <WidgetLeft>
      <template #left>
        <!-- <ControlLayer title="图层选择" />
        <ControlTile title="地图选择" />
        <ControlLegend title="图例" />
        <ControlParams title="地图参数" /> -->
        <slot name="left" />
      </template>
    </WidgetLeft>
    <WidgetRight>
      <template #right>
        <slot name="right" />
      </template>
    </WidgetRight>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import {
  WidgetLeft,
  WidgetRight,
  ControlTile,
  ControlLegend,
  ControlLayer,
  ControlParams,
} from './components/index'

const props = defineProps<{
  // 3D模式下，是否需要偏移顶部
  isOffsetTop?: boolean
}>()

const offsetTopClass = computed(() =>
  props.isOffsetTop ? 'top-60px h-[calc(100%-120px)]' : 'top-0 h-[calc(100%-32px)]'
)

defineOptions({ name: 'BaseMapWidget' })
</script>
<style lang="scss" scoped>
.base-map-widget {
  position: absolute;

  // top: 0;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;

  // height: calc(100% - 32px);
  padding: 16px;
  pointer-events: none;
  background-color: transparent;
}
</style>
