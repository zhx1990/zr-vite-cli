<template>
  <BaseCollapse :title="props.title" :empty="isEmpty(layerControlData)">
    <NCheckboxGroup v-model:value="checkedValue" :on-update-value="handleUpdateValue">
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
import { h, inject, ref, computed, watchEffect } from 'vue'
import { useMap, LAYER_IDS } from '@/visualization/map'
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

const { MAP_PROVIDE_KEY } = useMap()

const map = inject(MAP_PROVIDE_KEY)
const layerControlData = computed(() => map?.layerControlData.value)
const checkedValue = ref()

watchEffect(() => {
  checkedValue.value = layerControlData.value?.map((item) => item.value)
})

const handleUpdateValue = (
  value: (string | number)[],
  meta: {
    actionType: 'check' | 'uncheck'
    value: string | number
  }
) => {
  const layer = map?.getLayer(LAYER_IDS.SITE_LAYER)
  if (layer) {
    layer.eachOverlay((item) => {
      if (item.attr.legendType === meta.value) {
        map?.toggleOverlay(item)
      }
    })
  }
  emits('update:checked', value, meta)
}
</script>
<style lang="scss" scoped></style>
