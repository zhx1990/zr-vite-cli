<template>
  <NRadioGroup v-model:value="mapMode" @update:value="map?.changeBaseLayer">
    <NSpace vertical>
      <NRadio v-for="item in props.data" :key="item.value" :value="item.value" class="text-16px">
        <div class="flex-center flex-content-between">
          {{ item.label }}
          <img :src="item.imgPath" class="w-17px h-16px ml-15px" />
        </div>
      </NRadio>
    </NSpace>
  </NRadioGroup>
</template>
<script lang="ts" setup>
import { useMapStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useMap } from '@/visualization/map'
import { inject } from 'vue'
import { IBaseLayerTooltipCollapsePanelData } from '../types'

const props = defineProps<{
  data: IBaseLayerTooltipCollapsePanelData[]
}>()

const { mapMode } = storeToRefs(useMapStore())
const { MAP_PROVIDE_KEY } = useMap()

const map = inject(MAP_PROVIDE_KEY)
</script>
<style lang="scss" scoped>
:deep(.n-radio__dot-wrapper) {
  width: 20px;
}

:deep(.n-radio__dot) {
  width: 18px;
  height: 18px;
}
</style>
