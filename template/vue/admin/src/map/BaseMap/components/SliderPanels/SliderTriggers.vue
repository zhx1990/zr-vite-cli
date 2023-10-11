<template>
  <div class="base-sider-triggers">
    <template v-if="size(configs) > 1">
      <BaseHoverContainer
        v-for="config in configs"
        :key="config.label"
        :tooltip-content="config.label"
        placement="left"
        class="mb-10px"
      >
        <BaseDarkModeContainer>
          <div
            class="base-sider-trigger"
            :class="{ 'bg-info_hover text-white': config.value === current.value }"
            @click="actions.onCurrent(config)"
          >
            <div class="base-sider-trigger-icon reservoir" :class="config.icon"></div>
          </div>
        </BaseDarkModeContainer>
      </BaseHoverContainer>
    </template>

    <BaseDarkModeContainer>
      <div class="base-sider-trigger" @click="actions.onCollapsed">
        <IconMdi:chevron-double-left v-if="props.collapsed" />
        <IconMdi:chevron-double-right v-else />
      </div>
    </BaseDarkModeContainer>
  </div>
</template>
<script setup lang="ts">
import { size } from 'lodash'

interface PropsType {
  current: any
  collapsed: boolean
  configs: {
    icon: string
    label: string
    value: string
    component: any
  }[]
}
const props = defineProps<PropsType>()

const emit = defineEmits(['update:collapsed', 'update:current'])
const actions = {
  onCollapsed() {
    emit('update:collapsed', !props.collapsed)
  },
  onCurrent(current: any) {
    emit('update:current', current)
    emit('update:collapsed', false)
  },
}
</script>
<style lang="scss" scoped>
.base-sider-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 22px;
  cursor: pointer;

  .base-sider-trigger-icon {
    font-size: 20px;
  }
}
</style>
