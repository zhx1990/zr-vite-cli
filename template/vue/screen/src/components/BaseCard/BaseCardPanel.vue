<template>
  <div class="card b-border_color border-1px bg-bg_color">
    <div class="title" :style="props.titleStyle">{{ props.title }}</div>
    <div class="content">
      <BaseLoadingEmptyWrapper :loading="props.loading" :empty="props.empty">
        <slot></slot>
      </BaseLoadingEmptyWrapper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type StyleValue } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    loading?: boolean
    empty?: boolean
    titleStyle?: StyleValue
  }>(),
  {
    loading: false,
    empty: false,
  }
)
</script>
<style lang="scss" scoped>
.card {
  box-sizing: border-box;
  border-radius: 5px;

  .title {
    box-sizing: border-box;
    min-width: 117px;
    min-height: 42px;
    padding-top: 5px;
    text-align: center;
    background: url('/images/systems/bg_title_legend.png') no-repeat;
    background-size: cover;
  }

  .content {
    padding: 10px;
    padding-top: 0;
  }
}
</style>
