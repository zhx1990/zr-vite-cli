<template>
  <div class="h-full">
    <SliderHeader title="实时雨情" />
    <Statistics></Statistics>
    <FsTable
      ref="crudTable"
      v-bind="crudOptions"
      size="small"
      :data="dataSource"
      :rowHandle="rowHandle"
    ></FsTable>
  </div>
</template>
<script lang="ts" setup>
import { SliderHeader } from '@/map/BaseMap'
import { ref } from 'vue'
import { useCrudBranch } from '@/hooks'
import Statistics from './Statistics.vue'

const crudTable = ref(null)
const { buildFormOptions } = useCrudBranch()

const rowHandle = {
  show: false,
}
const crudOptions = buildFormOptions({
  columns: {
    bdName: {
      title: '测站名称',
      align: 'center',
    },
    rain: {
      title: '1小时降雨',
      align: 'center',
    },
    total: {
      title: '日累计雨量',
      align: 'center',
    },
    level: {
      title: '降雨等级',
      align: 'center',
    },
  },
})

const dataSource = [
  {
    bdName: '东风水库',
    rain: 1.5,
    total: 23.4,
    level: '中雨',
  },
]
</script>
<style lang="scss" scoped></style>
