<template>
  <div ref="threeRef" class="drawing"></div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useDrawing } from './useDrawing'

const { threeRef, setupThree, destroy } = useDrawing()

onMounted(() => {
  setupThree()
})

onUnmounted(() => {
  // destroy()
})
</script>
<style lang="scss" scoped>
.drawing {
  width: 100%;
  height: 700px;
}
</style>
