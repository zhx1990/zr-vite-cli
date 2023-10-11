<template>
  <div class="base-sider-header">
    <span>{{ title }}</span>
    <span class="base-sider-header-extra">
      <slot name="extra"></slot>
    </span>
  </div>
</template>
<script setup lang="ts">
interface PropsType {
  title: string
  more?: string
}
defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-sider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 16px;
  font-weight: 700;
  color: rgb(var(--primary-6));
}
</style>
