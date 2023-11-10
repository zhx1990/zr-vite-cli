<template>
  <MapInputSearch />
  <LayerTooltipCollapsePro class="absolute-rb bottom-80px"> </LayerTooltipCollapsePro>
</template>
<script lang="ts" setup>
import { h, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store'
import { MapInputSearch, LayerTooltipCollapsePro } from '@/visualization/map/BaseMap'
</script>
<style lang="scss" scoped>
:deep(.n-form-item-feedback-wrapper) {
  display: none;
}
</style>
