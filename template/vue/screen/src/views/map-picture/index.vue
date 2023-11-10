<template>
  <LayoutWidget isOffsetTop>
    <template #left> </template>
    <template #content>
      <Widget />
    </template>
    <template #right> </template>
  </LayoutWidget>
</template>
<script lang="ts" setup>
import { LayoutWidget } from '@/layouts'
import Widget from './Widget/Widget.vue'
</script>
<style lang="scss" scoped></style>
