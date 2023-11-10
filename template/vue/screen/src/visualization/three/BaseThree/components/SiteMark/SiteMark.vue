<template>
  <div class="marker-trigger">
    <div class="icon">
      <div class="icon-inner">
        <BaseSvgIcon :local-icon="icon" />
        <!-- <div v-show="props.warnStatus === 2" class="alarm"></div> -->
      </div>
    </div>
    <div class="name">{{ props.bdName }}</div>
  </div>
</template>
<script setup lang="ts">
import { getLegendTypeByValue } from '@/config'
import { computed } from 'vue'

interface PropsType {
  bdName: string
  legendType: number
}

const props = defineProps<PropsType>()
const icon = computed(() => {
  // if (!props.legendType) {
  //   const cache = getLegendTypeByValue(6)
  //   return cache?.icon ?? ''
  // }
  const cache = getLegendTypeByValue(props.legendType)
  return cache?.icon ?? ''
})
</script>
<style lang="scss" scoped>
.marker-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;

  .icon {
    box-sizing: border-box;

    // width: 24px;
    // height: 24px;
    padding: 2px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 5px 8px #00000059;

    .icon-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, #fff 0%, #a9bdc2 100%);
      border-radius: 50%;

      img {
        position: relative;
        z-index: 2;
        width: 80%;
        height: 80%;
      }

      svg {
        font-size: 32px;
      }

      .alarm {
        position: absolute;
        z-index: 1;
        width: 40px;
        height: 40px;
        content: '';
        background-color: red;
        border-radius: 50%;
        opacity: 0;
        animation: ripple-effect 2s linear 0.5s infinite;
      }
    }
  }

  .name {
    padding: 0 10px;
    margin-top: 4px;
    overflow: hidden;
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    background-color: #00000073;
    border-radius: 20px;
  }
}
@keyframes ripple-effect {
  0% {
    opacity: 1;
    transform: scale(0);
  }

  100% {
    opacity: 0;
    transform: scale(2);
  }
}
</style>
