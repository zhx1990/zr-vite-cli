<template>
  <div ref="elRef" class="base-div-icon">
    <div v-if="!props.showTip" class="content" :class="props.type">
      <div class="arrow-t"></div>
      <div class="arrow-b"></div>
      <div class="arrow-c"></div>
      <dl>
        <dt>{{ props.title }}</dt>
        <dd>水位: {{ props.waterLevel }}</dd>
        <dd v-if="props.flowVelocity">流速: {{ props.flowVelocity }}</dd>
        <dd>时间: {{ props.time }}</dd>
      </dl>
    </div>
    <!-- <div class="flex-center mt-15px relative cursor-pointer">
      <img :src="`/images/systems/${props.type}.png`" class="w-150px h-150px" />
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import { onMounted, nextTick, ref } from 'vue'
import { useScreenZoom } from '@/hooks'

const props = withDefaults(
  defineProps<{
    type?: 'level-1' | 'level-2' | 'level-3' | 'level-4'
    title?: string
    showTip?: boolean
    time?: string
    flowVelocity?: string
    waterLevel: string
  }>(),
  {
    type: 'level-4',
  }
)

const { elRef, setDomZoom } = useScreenZoom()
onMounted(async () => {
  await nextTick()
  setDomZoom()
})
</script>
<style lang="scss" scoped>
$level-1: $warning-color-level-1;
$level-2: $warning-color-level-2;
$level-3: $warning-color-level-3;
$level-4: $warning-color-level-4;

.base-div-icon {
  // position: absolute;
  // top: 0;
  // left: 0;

  .content {
    position: relative;
    top: 50px;
    left: 0;
    box-sizing: border-box;
    width: 150px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 50%);
    border-style: solid;
    border-width: 1px;

    // 绘制一个三角箭头，朝下

    dt {
      padding: 2px 5px;
      margin-bottom: 5px;
    }

    dd {
      padding: 0 5px;
    }

    .arrow-c {
      position: absolute;
      bottom: -10px;
      left: 68px;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
    }

    .arrow-b::after {
      position: absolute;
      right: -10px;
      bottom: -10px;
      width: 10px;
      height: 10px;
      content: '';
      transform: rotate(0);
    }

    .arrow-b::before {
      position: absolute;
      bottom: -10px;
      left: -10px;
      width: 10px;
      height: 10px;
      content: '';
      transform: rotate(0);
    }

    .arrow-t::after {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 10px;
      height: 10px;
      content: '';
      transform: rotate(180deg);
    }

    .arrow-t::before {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 10px;
      height: 10px;
      content: '';
      transform: rotate(180deg);
    }
  }

  .level-1 {
    border-color: $level-1;
    box-shadow: 0 0 10px 0 $level-1;

    dt {
      background: linear-gradient(to right, $level-1, transparent);
    }

    .arrow-c {
      border-top: 10px solid $level-1;
    }

    .arrow-b::after {
      border-right: 1px solid $level-1;
      border-bottom: 1px solid $level-1;
    }

    .arrow-b::before {
      border-bottom: 1px solid $level-1;
      border-left: 1px solid $level-1;
    }

    .arrow-t::before {
      border-bottom: 1px solid $level-1;
      border-left: 1px solid $level-1;
    }

    .arrow-t::after {
      border-right: 1px solid $level-1;
      border-bottom: 1px solid $level-1;
    }
  }

  .level-2 {
    border-color: $level-2;
    box-shadow: 0 0 10px 0 $level-2;

    dt {
      background: linear-gradient(to right, $level-2, transparent);
    }

    .arrow-c {
      border-top: 10px solid $level-2;
    }

    .arrow-b::after {
      border-right: 1px solid $level-2;
      border-bottom: 1px solid $level-2;
    }

    .arrow-b::before {
      border-bottom: 1px solid $level-2;
      border-left: 1px solid $level-2;
    }

    .arrow-t::before {
      border-bottom: 1px solid $level-2;
      border-left: 1px solid $level-2;
    }

    .arrow-t::after {
      border-right: 1px solid $level-2;
      border-bottom: 1px solid $level-2;
    }
  }

  .level-3 {
    border-color: $level-3;
    box-shadow: 0 0 10px 0 $level-3;

    dt {
      background: linear-gradient(to right, $level-3, transparent);
    }

    .arrow-c {
      border-top: 10px solid $level-3;
    }

    .arrow-b::after {
      border-right: 1px solid $level-3;
      border-bottom: 1px solid $level-3;
    }

    .arrow-b::before {
      border-bottom: 1px solid $level-3;
      border-left: 1px solid $level-3;
    }

    .arrow-t::before {
      border-bottom: 1px solid $level-3;
      border-left: 1px solid $level-3;
    }

    .arrow-t::after {
      border-right: 1px solid $level-3;
      border-bottom: 1px solid $level-3;
    }
  }

  .level-4 {
    border-color: $level-4;
    box-shadow: 0 0 10px 0 $level-4;

    dt {
      background: linear-gradient(to right, $level-4, transparent);
    }

    .arrow-c {
      border-top: 10px solid $level-4;
    }

    .arrow-b::after {
      border-right: 1px solid $level-4;
      border-bottom: 1px solid $level-4;
    }

    .arrow-b::before {
      border-bottom: 1px solid $level-4;
      border-left: 1px solid $level-4;
    }

    .arrow-t::before {
      border-bottom: 1px solid $level-4;
      border-left: 1px solid $level-4;
    }

    .arrow-t::after {
      border-right: 1px solid $level-4;
      border-bottom: 1px solid $level-4;
    }
  }
}
</style>
