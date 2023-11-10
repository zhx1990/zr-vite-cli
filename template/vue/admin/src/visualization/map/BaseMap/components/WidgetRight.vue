<template>
  <div class="pointer-events-auto relative">
    <slot name="right" />
  </div>
</template>
<script lang="ts" setup>
defineOptions({ name: 'BaseMapWidgetRight' })
</script>
<style lang="scss" scoped></style>
