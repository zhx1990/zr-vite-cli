<template>
  <div ref="elRef" class="base-div-icon">
    <div class="content">
      <div class="arrow-c"></div>
      <div class="name">{{ props.name }}</div>
    </div>
    <BaseSvgIcon local-icon="model-point" class="text-100px absolute left-12px" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  name: string
}>()
</script>
<style lang="scss" scoped>
$level-1: rgba(0, 120, 217, 100%);
$level-1-opacity: rgba(0, 120, 217, 30%);
$level-1-border: rgba(0, 174, 255, 100%);

.base-div-icon {
  min-width: 120px;

  .content {
    position: relative;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $level-1-opacity;
    border-color: $level-1-border;
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 $level-1;

    .name {
      padding: 5px 20px;
    }

    .arrow-c {
      position: absolute;
      bottom: -10px;
      left: 55px;
      border-top: 10px solid $level-1;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
    }
  }
}
</style>
