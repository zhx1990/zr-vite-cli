<template>
  <div
    class="widget-right right w-450px pointer-events-auto border-rd relative box-border"
    :class="control ? 'controlTrue right-[-450px] w-0!' : 'right-0 w-450px'"
  >
    <slot name="right" />
  </div>
  <div
    class="control pointer-events-auto"
    :class="control ? 'control-true right-0!' : 'right-450px!'"
    @click="handleControl"
  ></div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useThreeStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const { isShowThree } = storeToRefs(useThreeStore())
const route = useRoute()
const control = ref(false)

watch(
  () => route.name,
  () => {
    const compassEl = document.querySelector('.compass') as HTMLElement
    if (compassEl) {
      compassEl.classList.remove('compass-offset')
    }
  }
)
const handleControl = () => {
  control.value = !control.value
  // 适配指南针
  const compassEl = document.querySelector('.compass') as HTMLElement
  if (compassEl) {
    if (control.value) {
      compassEl.classList.add('compass-offset')
    } else {
      compassEl.classList.remove('compass-offset')
    }
  }
}
</script>
<style lang="scss" scoped>
.right {
  padding: 0 20px;
  margin-top: -12px;
  background: linear-gradient(
    0deg,
    rgba(1, 18, 38, 0%) 0%,
    rgba(1, 18, 38, 70%) 50%,
    rgba(1, 18, 38, 0%) 100%
  );
  transition: all 0.3s ease-in-out;
}

.control {
  position: absolute;
  top: 400px;
  right: 450px;
  width: 55px;
  height: 130px;
  background: url('/images/systemsNew/right_contract.png') no-repeat;
  background-size: cover;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }
}

.control-true {
  background-image: url('/images/systemsNew/right_expand.png') !important;
}
</style>
