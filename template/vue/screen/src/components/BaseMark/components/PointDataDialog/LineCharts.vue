<template>
  <div>
    <div ref="domRef" class="h-270px w-full"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useEcharts, ECOption } from '@/hooks'
import { Statistics } from '@/components/BaseCard'

import * as echarts from 'echarts/core'

interface Props {
  /** 登录模块分类 */
  cdata: any
}

const props = defineProps<Props>()

const yData2 = computed(() => props.cdata.map((element) => element.t3))
const yData = computed(() => props.cdata.map((element) => element.t2))

const xData = computed(() => props.cdata.map((element) => element.t1))

const pieOptions = computed<ECOption>(() => ({
  tooltip: {
    trigger: 'axis',
    extraCssText:
      'background-color: #040f23;border-radius: 10px;border: solid 1px #13a6dc;box-shadow: 0px 0px 9px #13a6dc;',
  },
  grid: {
    left: 30,
    top: 30,
    right: 30,
    bottom: 20,
  },
  xAxis: {
    type: 'category',
    data: xData.value,
    axisLine: {
      onZero: false,
    },
  },
  yAxis: [
    {
      inverse: true,
      type: 'value',
      name: '水位（m）',
      nameLocation: 'start',
      axisLine: { show: true },
    },

    {
      inverse: true,
      type: 'value',
      name: '流速（m/s）',
      nameLocation: 'start',
    },
  ],
  series: [
    {
      name: '流速',
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 10,
      data: yData.value,
      type: 'line',
      itemStyle: {
        color: '#fff100',
        borderColor: '#ffffff',
      },
    },

    {
      name: '水位',
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 10,
      data: yData2.value,
      type: 'line',
      itemStyle: {
        color: '#00ffc7',
        borderColor: '#ffffff',
      },
    },
  ],
}))

const { domRef } = useEcharts(pieOptions)
</script>
<style lang="scss" scoped></style>
