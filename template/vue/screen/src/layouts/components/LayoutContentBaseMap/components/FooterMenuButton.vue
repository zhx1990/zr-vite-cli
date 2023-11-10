<template>
  <div class="footer-menu-button flex">
    <img :src="props.imgPath" class="footer-menu-img w-79px h-64px" />
    <div class="text-14px">
      {{ props.label }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, computed } from 'vue'

const props = defineProps<{
  label: string
  imgPath: string
  imgActivePath: string
}>()

onMounted(() => {
  const selectedEl = document.querySelector('.n-menu-item-content--selected') as HTMLElement
  if (selectedEl) {
    const imgEl = selectedEl.querySelector('.footer-menu-img') as HTMLImageElement
    imgEl.src = props.imgActivePath!
  }
})
</script>
<style lang="scss">
.footer-menu-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -40px;
  font-weight: bold;
  text-align: center;
  background-size: contain;
}
</style>
