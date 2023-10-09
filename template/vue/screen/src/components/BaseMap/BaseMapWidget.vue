<template>
  <div class="base-map-widget" :class="offsetTopClass">
    <WidgetLeft>
      <template #left>
        <slot name="left" />
      </template>
    </WidgetLeft>
    <WidgetContent>
      <template #content>
        <slot name="content" />
      </template>
    </WidgetContent>

    <WidgetRight>
      <template #right>
        <slot name="right" />
      </template>
    </WidgetRight>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { WidgetLeft, WidgetRight, WidgetContent } from './components/index'

const props = defineProps<{
  // 3D模式下，是否需要偏移顶部
  isOffsetTop?: boolean
}>()

const offsetTopClass = computed(() =>
  props.isOffsetTop ? 'top-70px h-[calc(100%-170px)]' : 'top-0 h-[calc(100%-32px)]'
)

defineOptions({ name: 'BaseMapWidget' })
</script>
<style lang="scss" scoped>
.base-map-widget {
  position: absolute;

  // top: 0;
  left: 0;
  z-index: 2;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;

  // height: calc(100% - 32px);
  pointer-events: none;
  background-color: transparent;
}
</style>
