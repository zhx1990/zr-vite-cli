<template>
  <div
    class="widget-left left w-450px pointer-events-auto border-rd relative box-border bg-color"
    :class="control ? 'controlTrue w-0! p-0!' : 'w-450px'"
  >
    <slot name="left" />
  </div>
  <div
    class="control pointer-events-auto"
    :class="control ? 'control-true left-0!' : 'left-450px!'"
    @click="handleControl"
  ></div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const control = ref(false)

const handleControl = () => {
  control.value = !control.value
}
</script>
<style lang="scss" scoped>
.left {
  padding: 0 20px;
  margin-top: -12px;
  overflow: hidden;
  background: linear-gradient(
    0deg,
    rgba(1, 18, 38, 0%) 0%,
    rgba(1, 18, 38, 90%) 50%,
    rgba(1, 18, 38, 0%) 100%
  );
  transition: all 0.3s ease-in-out;
}

.control {
  position: absolute;
  top: 400px;
  left: 450px;
  z-index: 10;
  width: 55px;
  height: 130px;
  background: url('/images/systemsNew/left_contract.png') no-repeat;
  background-size: cover;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }
}

.control-true {
  background-image: url('/images/systemsNew/left_expand.png') !important;
}
</style>
