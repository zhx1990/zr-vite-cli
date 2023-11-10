<template>
  <div></div>
</template>
<script lang="ts" setup>
import { h, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store'
</script>
<style lang="scss" scoped>
:deep(.n-form-item-feedback-wrapper) {
  display: none;
}
</style>
