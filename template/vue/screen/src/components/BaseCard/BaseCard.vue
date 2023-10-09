<template>
  <NCard class="b-none!">
    <template #header>
      <div class="header font-bold text-shadow-lg oblique">{{ props.title }}</div>
    </template>

    <template #header-extra>
      <slot name="header-extra" />
    </template>

    <slot />
  </NCard>
</template>
<script lang="ts" setup>
const props = defineProps<{
  title: string
}>()
</script>
<style lang="scss" scoped>
:deep(.n-card-header) {
  padding-top: 0;
  padding-bottom: 0;
}

:deep(.n-card-header .n-card-header__extra) {
  margin-bottom: 12px;
}

.header {
  box-sizing: border-box;
  width: 425.5px;
  height: 46.5px;
  padding-top: 0;
  padding-left: 50px;

  // margin-bottom: -10px;
  background: url('/images/systems/bg_s_title.png') no-repeat -15px;
  background-size: cover;
}
</style>
