<template>
  <div class="widget-left w-140px pointer-events-auto relative">
    <slot name="left" />
  </div>
</template>
<script lang="ts" setup>
defineOptions({ name: 'BaseMapWidgetLeft' })
</script>
<style lang="scss" scoped>
.widget-left {
  display: flex;
  flex-flow: column wrap;
  grid-gap: 10px;
  max-height: 100%;
}
</style>
