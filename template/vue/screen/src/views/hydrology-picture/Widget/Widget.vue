<template>
  <div></div>
</template>
<script lang="ts" setup>
import { h, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMapStore } from '@/store'
import { BaseForm } from '@/components/BaseForm'
import { type CrudOptions, type Dict, dict } from '@fast-crud/fast-crud'
import { InputSearch } from '@/components/BaseMap/components'
</script>
<style lang="scss" scoped>
:deep(.n-form-item-feedback-wrapper) {
  display: none;
}
</style>
