<template>
  <div class="right w-450px pointer-events-auto border-rd p-20px relative box-border">
    <slot name="right" />
  </div>
</template>
<script lang="ts" setup>
defineOptions({ name: 'BaseMapWidgetRight' })
</script>
<style lang="scss" scoped>
.right {
  background: linear-gradient(
    0deg,
    rgba(1, 18, 38, 0%) 0%,
    rgba(1, 18, 38, 70%) 50%,
    rgba(1, 18, 38, 0%) 100%
  );
}
</style>
