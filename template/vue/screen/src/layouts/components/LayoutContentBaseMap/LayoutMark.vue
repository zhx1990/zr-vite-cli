<template>
  <div class="mask"></div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: url('./images/icon_mask.png') no-repeat;
  background-size: cover;
}
</style>
