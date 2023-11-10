<template>
  <BaseMap>
    <slot></slot>
  </BaseMap>
</template>
<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import { BaseMap } from '@/visualization/map/BaseMap'
</script>
<style lang="scss" scoped></style>
