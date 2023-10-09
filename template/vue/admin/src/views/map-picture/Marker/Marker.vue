<template>
  <BaseNaiveUiConfigProvider>
    <div class="marker-site-point">
      <NPopover placement="right-start" trigger="hover">
        <template #trigger>
          <MarkerTrigger :data="data" />
        </template>
        <MarkerPopup :data="data" />
      </NPopover>
    </div>
  </BaseNaiveUiConfigProvider>
</template>
<script setup lang="ts">
import { NPopover } from 'naive-ui'
import MarkerTrigger from './components/MarkerTrigger.vue'
import MarkerPopup from './components/MarkerPopup.vue'

interface PropsType {
  data: {
    id: string
    name: string
    legendType: number
    warnStatus: string
  }
}
defineProps<PropsType>()
</script>
