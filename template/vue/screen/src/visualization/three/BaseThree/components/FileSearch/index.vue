<template>
  <div class="file-search">
    <NGrid cols="20" :x-gap="12">
      <NGi span="5">
        <BaseWrapContainerBorder-1 class="p-20px">
          <NInput v-model:value="pattern" />
          <STree :components-props="{ pattern, blockLine: true }" :data="data" />
        </BaseWrapContainerBorder-1>
      </NGi>
      <NGi span="15">
        <BaseWrapContainerBorder-1 class="p-20px">
          <Drawing />
        </BaseWrapContainerBorder-1>
      </NGi>
    </NGrid>
  </div>
</template>
<script lang="ts" setup>
import { type TreeOption, NGrid, NInput } from 'naive-ui'
import STree from '@/components/ScreenUiComponents/STree.vue'
import { ref } from 'vue'
import Drawing from './Drawing/index.vue'

const pattern = ref()

const data: TreeOption[] = [
  {
    label: '规划',
    key: '0',
    children: [
      {
        label: '图纸1',
        key: '0-0',
      },
      {
        label: '图纸2',
        key: '0-1',
      },
    ],
  },
  {
    label: '设计',
    key: '1',
    children: [
      {
        label: '目录',
        key: '1-0',
        children: [{ label: '图纸4', key: '1-0-0' }],
      },
      {
        label: '施工',
        key: '1-1',
      },
      {
        label: '其他',
        key: '1-2',
      },
    ],
  },
]
</script>
<style lang="scss" scoped></style>
