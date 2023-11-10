<template>
  <div class="three-widget">
    <div class="absolute-lt left-20px pointer-events-auto">
      <slot name="left"></slot>
    </div>

    <div class="absolute-rt right-20px pointer-events-auto">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    offsetTop?: string
    height?: string
  }>(),
  {
    offsetTop: '.5rem',
    height: 'calc(100% - 1rem)',
  }
)
const top = computed(() => props.offsetTop)
const height = computed(() => props.height)
</script>
<style lang="scss" scoped>
.three-widget {
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
