<template>
  <div class="button flex-center flex-col" @click="handlerClick">
    <img :src="props.imgPath" class="w-20px h-18px mb-2px" />
    <div class="text-12px">{{ props.label }}</div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  imgPath: string
  label: string
}>()

const emits = defineEmits<{
  'on:click': []
}>()

const handlerClick = () => {
  emits('on:click')
}
</script>
<style lang="scss" scoped>
.button {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border: 1px solid #015396;
  border-radius: 4px;
  box-shadow: inset 0 0 15px rgba(0, 46, 99, 100%);

  &:hover {
    border: 1px solid #017f96;
    box-shadow: inset 0 0 15px rgba(0, 78, 89, 100%);
  }
}
</style>
