<template>
  <BaseCollapse :title="props.title" :empty="isEmpty(legendControlData)">
    <NSpace vertical>
      <NP v-for="item in legendControlData" :key="item.label" class="flex items-center">
        <BaseSvgIcon :local-icon="item.icon" class="mr-10px" />
        {{ item.label }}
      </NP>
    </NSpace>
  </BaseCollapse>
</template>
<script lang="ts" setup>
import { useMap } from '@/visualization/map'
import { isEmpty } from 'lodash'
import { computed, inject } from 'vue'

const props = withDefaults(
  defineProps<{
    /* 标题 */
    title?: string
  }>(),
  {
    title: '地图选择',
  }
)

const { MAP_PROVIDE_KEY } = useMap()

const map = inject(MAP_PROVIDE_KEY)

const legendControlData = computed(() => map?.legendControlData.value)
</script>
<style lang="scss" scoped></style>
