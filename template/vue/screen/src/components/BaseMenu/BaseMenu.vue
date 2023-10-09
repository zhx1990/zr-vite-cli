<template>
  <NMenu :options="options" v-bind="$attrs" />
</template>
<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'

defineOptions({ name: 'BaseMenu' })

defineProps<{
  options: MenuOption[]
}>()
</script>
<style lang="scss" scoped></style>
