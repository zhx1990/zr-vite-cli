<template>
  <BaseCollapse :title="props.title" :empty="isEmpty(tileControlData)">
    <div class="container">
      <div
        v-for="item in tileControlData"
        :key="item.value"
        class="tile-item"
        :class="current === item.value ? 'border-blue!' : ''"
        @click="handlerBaseLayer(item.value)"
      >
        <img :src="item.thumb" :alt="item.label" />
        <span :class="current === item.value ? 'bg-blue!' : ''">{{ item.label }}</span>
      </div>
    </div>
  </BaseCollapse>
</template>
<script lang="ts" setup>
import { type MapModeType, useMap } from '@/visualization/map'
import { inject, ref, computed } from 'vue'
import { isEmpty } from 'lodash'

const props = withDefaults(
  defineProps<{
    /* 标题 */
    title?: string
  }>(),
  {
    title: '地图选择',
  }
)

const { MAP_PROVIDE_KEY } = useMap()

const map = inject(MAP_PROVIDE_KEY)

const tileControlData = computed(() => map?.tileControlData.value)

const current = ref<MapModeType>('2D-IMG')
const handlerBaseLayer = (type) => {
  current.value = type
  map?.changeBaseLayer(type)
}
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4px;
  padding: 0 6px 6px;

  .tile-item {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    cursor: pointer;
    background-color: #dedede;
    @apply dark:border-black border-white border-2;

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    span {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 2px 6px 0 4px;
      font-size: 10px;
      color: #fff;
      cursor: pointer;
      background-color: #00000073;
    }

    &.active,
    &:hover {
      @apply border-2 border-blue;

      span {
        @apply bg-blue;
      }
    }
  }
}
</style>
