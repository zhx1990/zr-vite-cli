<template>
  <BaseMapWidget isOffsetTop>
    <template #left> </template>
    <template #content>
      <Widget />
    </template>
    <template #right> </template>
  </BaseMapWidget>
</template>
<script lang="ts" setup>
import { BaseMapWidget } from '@/map/BaseMap'
import Widget from './Widget/Widget.vue'
</script>
<style lang="scss" scoped></style>
