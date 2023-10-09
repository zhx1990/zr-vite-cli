<template>
  <BaseNaiveUiConfigProvider class="h-auto!">
    <NModal
      v-model:show="show"
      preset="dialog"
      :title="title"
      positive-text="确认"
      negative-text="取消"
      v-bind="props.componentProps"
      :positive-button-props="size"
      :negative-button-props="size"
      :style="{
        width: '960px',
      }"
    >
      <slot></slot>
    </NModal>
  </BaseNaiveUiConfigProvider>
</template>
<script lang="ts" setup>
import { onUnmounted, ref, computed } from 'vue'
import { BaseNaiveUiConfigProvider, BaseNaiveProvider } from '@/components/BaseNaiveProvider'
import { type ModalProps, ButtonProps, NModal } from 'naive-ui'

const props = withDefaults(
  defineProps<{
    title?: string
    componentProps?: ModalProps
  }>(),
  {
    title: '标题',
  }
)
const emits = defineEmits<{
  'update:show': [show: boolean]
}>()
const showModal = ref(false)
const show = computed({
  get() {
    return props.componentProps?.show ?? showModal.value
  },
  set(val) {
    props.componentProps?.show ? emits['update:show']?.(val) : (showModal.value = val)
  },
})
const size: ButtonProps = {
  size: 'medium',
}
setTimeout(() => {
  showModal.value = true
}, 0)

onUnmounted(() => {})
</script>
<style lang="scss" scoped></style>
