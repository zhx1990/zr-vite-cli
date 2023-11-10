<template>
  <div class="base-widget">
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
import { WidgetLeft, WidgetRight, WidgetContent } from './index'

const props = withDefaults(
  defineProps<{
    offsetTop?: string
    height?: string
  }>(),
  {
    offsetTop: '.5rem',
    height: 'calc(100% - .6rem)',
  }
)
const top = computed(() => props.offsetTop)
const height = computed(() => props.height)
</script>
<style lang="scss" scoped>
.base-widget {
  position: absolute;
  top: v-bind(top);
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: v-bind(height);
  pointer-events: none;
  background-color: transparent;
}
</style>
