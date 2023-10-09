<script lang="ts" setup>
const props = defineProps<{
  test: number
}>()
</script>

<template>
  <div class="div-icon">{{ test }}</div>
</template>

<style scoped>
.div-icon {
  padding: 2px;
  color: #333;
  user-select: none;
  background-color: #fff;
  border-radius: 4px;
}
</style>
