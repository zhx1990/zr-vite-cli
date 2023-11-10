<template>
  <NCheckboxGroup v-model:value="layerControl" :on-update-value="handleUpdateValue">
    <NSpace vertical>
      <NCheckbox v-for="item in props.data" :key="item.value" :value="item.value" class="text-16px">
        <div class="flex flex-center">
          <BaseSvgIcon v-if="item.imgPath" :local-icon="item.imgPath" class="mr-5px text-18px" />
          <div v-if="typeof item.label === 'string'" class="text-14px">{{ item.label }}</div>
          <component :is="item.label" v-else />
        </div>
      </NCheckbox>
    </NSpace>
  </NCheckboxGroup>
</template>
<script lang="ts" setup>
import { useMapStore } from '@/store'
import { storeToRefs } from 'pinia'
import { IBaseLayerTooltipCollapsePanelData } from '../types'

const props = defineProps<{
  data: IBaseLayerTooltipCollapsePanelData[] | any
}>()

const emits = defineEmits<{
  'update:value': [value: number[]]
}>()
const { layerControl } = storeToRefs(useMapStore())

const handleUpdateValue = (
  value: string[] | any,
  meta: {
    actionType: 'check' | 'uncheck'
    value: number[] | any
  }
) => {
  emits('update:value', value)
}
</script>
<style lang="scss" scoped>
:deep(.n-checkbox-box-wrapper) {
  width: 20px;
}

:deep(.n-checkbox-box) {
  width: 18px;
  height: 18px;
}
</style>
