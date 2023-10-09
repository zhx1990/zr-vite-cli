<template>
  <div class="left w-450px pointer-events-auto border-rd p-20px relative box-border bg-color">
    <slot name="left" />
  </div>
</template>
<script lang="ts" setup>
defineOptions({ name: 'BaseMapWidgetLeft' })
</script>
<style lang="scss" scoped>
.left {
  background: linear-gradient(
    0deg,
    rgba(1, 18, 38, 0%) 0%,
    rgba(1, 18, 38, 90%) 50%,
    rgba(1, 18, 38, 0%) 100%
  );
}
</style>
