<template>
  <BaseCollapse :title="props.title" :empty="isEmpty(layerControlData)">
    <NCheckboxGroup v-model:value="value" :on-update-value="handleUpdateValue">
      <NSpace vertical>
        <NCheckbox
          v-for="item in layerControlData"
          :key="item?.value"
          :value="item?.value"
          :label="item?.label"
        />
      </NSpace>
    </NCheckboxGroup>
  </BaseCollapse>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { useMap, LAYER_IDS } from '@/map'
import { isEmpty } from 'lodash'

const props = withDefaults(
  defineProps<{
    /* 标题 */
    title?: string
    /* 加载 */
    loading?: boolean
    /* 是否空 */
    empty?: boolean
  }>(),
  {
    title: '图层选择',
  }
)
const emits = defineEmits<{
  'update:checked': [
    value: (string | number)[],
    meta: { actionType: 'check' | 'uncheck'; value: string | number }
  ]
}>()

const { getLayer, layerControlData, toggleOverlay } = useMap()
const value = ref()

const handleUpdateValue = (
  value: (string | number)[],
  meta: {
    actionType: 'check' | 'uncheck'
    value: string | number
  }
) => {
  const layer = getLayer(LAYER_IDS.SITE_LAYER)
  if (layer) {
    layer.eachOverlay((item) => {
      if (item.attr.legendType === meta.value) {
        toggleOverlay(item)
      }
    })
  }
  emits('update:checked', value, meta)
}
</script>
<style lang="scss" scoped></style>
