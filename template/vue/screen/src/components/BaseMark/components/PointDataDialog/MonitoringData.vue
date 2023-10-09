<template>
  <div class="w-full h-650px flex justify-between">
    <div class="w-1000px">
      <!-- <FsSearch ref="searchRef" v-bind="options" :buttons="buttonsOpts" /> -->

      <BarCharts :cdata="tableData" />
      <LineCharts :cdata="tableData" />
    </div>
    <div class="w-400px">
      <div class="tbg h-40px mb-10px text-center font-bold text-18px leading-40px color-white">
        数据
      </div>
      <NDataTable
        :columns="columns"
        :data="tableData"
        :max-height="510"
        :bordered="false"
        :row-class-name="rowClass"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCrudBranch, useEcharts, ECOption } from '@/hooks'
import { dict } from '@fast-crud/fast-crud'
import { ref, computed } from 'vue'
import { DataTableColumn } from 'naive-ui'
import { random, ceil, cloneDeep } from 'lodash'
import dayjs from 'dayjs'

import LineCharts from './LineCharts.vue'
import BarCharts from './BarCharts.vue'

const { buildFormOptions } = useCrudBranch()
const formOpt = {
  show: true,
  labelPlacement: 'left',
}

const tableData = ref<any>([])

const searchRef = ref()

const dateEnum = {
  minute: 'YYYY-MM-DD HH:mm',
  hour: 'YYYY-MM-DD HH:00',
  day: 'YYYY-MM-DD',
  month: 'YYYY-MM',
}

const buildData = (obj) => {
  tableData.value = []

  for (let i = 0; i < 12; i++) {
    const t1 = dayjs().subtract(i, obj.d5).format(dateEnum[obj.d5])
    const t2 = random(10.0, 24.5).toFixed(2)
    const t3 = random(10.0, 24.5).toFixed(2)
    const t4 = random(10.0, 24.5).toFixed(2)
    const t5 = random(10.0, 24.5).toFixed(2)
    let t6 = random(10.0, 24.5).toFixed(2)
    if (obj.d2 === '°c') {
      t6 = random(1.0, 10.0).toFixed(2)
    }
    tableData.value.push({ t1, t2, t3, t4, t5, t6 })
  }
}

const buttonsOpts = {
  search: {
    text: '查询',
    click: (res) => {
      buildData(res.form)
    },
    col: {
      span: 4,
    },
  },
  reset: {
    show: false,
  },
}

buildData({ d5: 'minute' })

const options = buildFormOptions({
  columns: {
    d2: {
      title: '监测要素',
      type: 'dict-select',
      dict: dict({
        data: [
          { label: '水位', value: 'm' },
          { label: '流速', value: 'm/s' },
          { label: '流量', value: 'm³/s' },
          { label: '雨量', value: 'mm' },
          { label: '水温', value: '°c' },
          { label: '含沙量', value: 'm³' },
        ],
      }),
      form: {
        ...formOpt,
        col: {
          span: 4,
        },
      },
    },
    d3: {
      title: '时间范围',
      type: 'daterange',
      form: {
        ...formOpt,
        col: {
          span: 6,
        },
      },
    },
    d4: {
      title: '',
      type: 'dict-select',
      dict: dict({
        data: [
          { label: '近1个小时', value: 0 },
          { label: '近3个小时', value: 1 },
          { label: '近6个小时', value: 2 },
          { label: '近12个小时', value: 3 },
          { label: '近24个小时', value: 4 },
          { label: '近3天', value: 5 },
          { label: '近7天', value: 6 },
          { label: '近1月', value: 7 },
          { label: '近1季', value: 8 },
          { label: '近1年', value: 9 },
        ],
      }),
      form: {
        ...formOpt,
        col: {
          span: 2,
        },
      },
    },
    d5: {
      title: '时段',
      type: 'dict-select',
      slots: {},
      dict: dict({
        data: [
          { label: '分钟', value: 'minute' },
          { label: '小时', value: 'hour' },
          { label: '日', value: 'day' },
          { label: '月', value: 'month' },
        ],
      }),
      form: {
        ...formOpt,
        col: {
          span: 2,
        },
      },
    },
  },
})

const rowClass = (rowData, index) => {
  if (index % 2) {
    return 'even-row'
  }
  return ''
}

const columns: DataTableColumn[] = [
  {
    title: '时间',
    key: 't1',
    // width: 100,
    align: 'center',
  },
  {
    title: '水位（mm）',
    key: 't2',
    // width: 80,
    align: 'center',
  },
  {
    title: '流速（m/s）',
    key: 't3',
    // width: 100,
    align: 'center',
  },
]
</script>
<style lang="scss" scoped>
:deep(.n-form-item-feedback-wrapper) {
  display: none;
}

:deep(.n-form-item.n-form-item--top-labelled) {
  grid-template-rows: none;
}

:deep(.fs-search .n-form-item-blank) {
  min-width: 60px;
}

.tbg {
  background-image: linear-gradient(90deg, #06334f50 0%, #06334f 50%, #06334f50 100%);
}

:deep(.even-row) {
  background-color: #17406350;
}

// :deep(.fs-search-box .fs-search-mai) {
//   min-width: 0;
// }
</style>
