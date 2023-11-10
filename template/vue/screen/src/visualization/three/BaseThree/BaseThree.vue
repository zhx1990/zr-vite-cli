<template>
  <div id="base-three" ref="elRef" class="base-three w-full h-full">
    <div id="three-container" ref="threeRef" class="relative wh-full overflow-hidden">
      <LayoutMark />
      <!-- 大坝工程 -->
      <DamProject />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, provide } from 'vue'
import { LayoutMark } from '@/layouts'
import { DamProject } from './views'
import { useThree } from '../hooks/useThree'

const { threeRef, THREE_PROVIDE_KEY, setupThree, destroy, cameraRotate } = useThree()

provide(THREE_PROVIDE_KEY, {
  threeRef,
  cameraRotate,
})

onMounted(() => {
  setupThree()
})

onUnmounted(() => {
  destroy()
})
</script>
<style lang="scss" scoped>
.base-three {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
