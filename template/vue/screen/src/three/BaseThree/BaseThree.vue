<template>
  <div id="base-three" ref="elRef" class="base-three w-full h-full">
    <div
      id="three-container"
      ref="threeRef"
      class="relative wh-full overflow-hidden"
      :class="threeStore.isShowThree ? 'fadeout' : 'fadein'"
    >
      <NButton class="absolute left-100px top-100px z-99" @click="handlerButton">按钮</NButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { useThreeStore } from '@/store'
import { useThree } from '../useThree'

const { threeRef, setupThree } = useThree()
const threeStore = useThreeStore()
const handlerButton = () => {
  threeStore.setIsShowThree(false)
}
onMounted(() => {
  setupThree()
})
</script>
<style lang="scss" scoped>
.fadein {
  opacity: 0;
  transition: all 1s;
}

.fadeout {
  z-index: 10;
  opacity: 1;
  transition: all 1s;
}
</style>
