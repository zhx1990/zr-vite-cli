<template>
  <div class="card b-border_color border-1px bg-bg_color">
    <div class="title" :style="props.titleStyle">{{ props.title }}</div>
    <div class="content">
      <BaseLoadingEmptyWrapper :loading="props.loading" :empty="props.empty">
        <NSpace vertical>
          <NTag v-for="(item, index) in props.data" :key="index" :bordered="false">
            {{ item.label }}
            <template #avatar>
              <n-avatar v-if="item.imgPath" :src="item.imgPath" />
              <component :is="item.component" v-else />
            </template>
          </NTag>
        </NSpace>
      </BaseLoadingEmptyWrapper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { type Component, type StyleValue } from 'vue'

const props = withDefaults(
  defineProps<{
    data: {
      label: string
      imgPath?: string
      component?: Component
    }[]
    title: string
    titleStyle?: StyleValue
    loading?: boolean
    empty?: boolean
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
