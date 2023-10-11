<template>
  <div
    class="base-sider-panels"
    style="user-select: none"
    @mousedown.stop="() => {}"
    @mouseup.stop="() => {}"
    @wheel.stop="() => {}"
    @dblclick.stop="() => {}"
    @mouseenter.stop="() => {}"
    @mouseleave.stop="() => {}"
  >
    <SliderTriggers
      v-model:collapsed="collapsed"
      v-model:current="current"
      :configs="props.configs"
    />
    <div class="base-sider-panel-main">
      <BaseDarkModeContainer class="h-full p-10px rounded-md">
        <component :is="current.component"></component>
      </BaseDarkModeContainer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import SliderTriggers from './SliderTriggers.vue'

interface PropsType {
  configs: {
    icon: string
    label: string
    value: string
    component: any
  }[]
}
const props = defineProps<PropsType>()
const collapsed = ref(false)
const current = ref(props.configs[0])
const offsetleft = computed(() => (collapsed.value ? '50px' : '410px'))
</script>
<style lang="scss">
$offsetleft: v-bind(offsetleft);

.base-sider-panels {
  display: flex;
  width: $offsetleft;
  height: 100%;
  overflow: hidden;
  transition: width 0.3s ease-in-out;

  .base-sider-panel-main {
    box-sizing: border-box;
    width: 400px;
    height: 100%;
    margin-left: 10px;
  }

  .arco-table .arco-table-cell {
    padding: 9px 10px;
    font-size: 13px;
  }
}
</style>
