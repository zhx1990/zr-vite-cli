<template>
  <div v-if="showTooltip">
    <NTooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div
          class="flex-center h-full cursor-pointer dark:hover:bg-transparent"
          :class="contentClassName"
        >
          <slot></slot>
        </div>
      </template>
      {{ tooltipContent }}
    </NTooltip>
  </div>
  <div
    v-else
    class="flex-center cursor-pointer dark:hover:bg-transparent"
    :class="contentClassName"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PopoverPlacement } from 'naive-ui'

defineOptions({ name: 'BaseHoverContainer' })

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string
  /** tooltip的位置 */
  placement?: PopoverPlacement
  /** class类 */
  contentClass?: string
  /** 反转模式下 */
  inverted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
  inverted: false,
})

const showTooltip = computed(() => Boolean(props.tooltipContent))

const contentClassName = computed(
  () => `${props.contentClass} ${props.inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'}`
)
</script>

<style scoped></style>
