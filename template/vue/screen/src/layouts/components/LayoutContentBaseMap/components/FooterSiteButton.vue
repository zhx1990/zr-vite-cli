<template>
  <div class="absolute-center top-[-120px] pointer-events-none">
    <NSpace>
      <div
        v-for="(item, index) in props.data"
        :key="index"
        :class="['footer-site-button', { selected: index === selected }]"
        :style="{
          backgroundImage: `url(${item.imgPath})`,
        }"
        class="pointer-events-auto"
        @click="handleClick(index, item.onClick)"
      >
        <div
          class="mask"
          :style="{
            display: index === selected ? 'none' : 'block',
          }"
        ></div>
        <div class="relative">
          {{ item.label }}
        </div>
      </div>
    </NSpace>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useThreeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { IFooterSiteButtonProps } from '../types'

const props = defineProps<IFooterSiteButtonProps>()

const { isShowThree } = storeToRefs(useThreeStore())
const selected = ref(0)
watch(
  () => isShowThree.value,
  (val) => {
    if (!val) {
      selected.value = 0
    }
  },
  { immediate: true }
)

const handleClick = (index: number, fn: Function | undefined) => {
  selected.value = index
  fn && fn()
}
</script>
<style lang="scss" scoped>
.footer-site-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  font-size: 14px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: contain;
  border: 2px solid #808080;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 66px;
  height: 66px;
  background-color: #000;
  opacity: 0.6;
}

.selected {
  color: #00aeff;
  border: 2px solid #00aeff;
}
</style>
