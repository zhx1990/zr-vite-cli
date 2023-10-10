<template>
  <div class="absolute-center top-[-120px]">
    <NSpace>
      <div
        v-for="(item, index) in props.data"
        :key="index"
        :class="['footer-site-button', { selected: index === selected }]"
        @click="handleClick(index, item.onClick)"
      >
        {{ item.label }}
      </div>
    </NSpace>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IFooterSiteButtonProps } from '../types'

const props = defineProps<IFooterSiteButtonProps>()
const selected = ref(0)

const handleClick = (index: number, fn: Function | undefined) => {
  selected.value = index
  fn && fn()
}
</script>
<style lang="scss" scoped>
.footer-site-button {
  display: flex;
  width: 128px;
  height: 40px;
  padding-top: 14px;
  padding-left: 49px;
  cursor: pointer;
  background-image: url('/images/systems/btn_site1.png');
  background-repeat: no-repeat;
  background-size: contain;
}

.selected {
  background-image: url('/images/systems/btn_site2.png');
}
</style>
