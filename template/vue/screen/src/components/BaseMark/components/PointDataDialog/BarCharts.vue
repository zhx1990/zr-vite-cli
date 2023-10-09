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

const yData = computed(() => props.cdata.map((element) => element.t3))

const xData = computed(() => props.cdata.map((element) => element.t1))

const pieOptions = computed<ECOption>(() => ({
  tooltip: {
    trigger: 'item',
    extraCssText:
      'background-color: #040f23;border-radius: 10px;border: solid 1px #13a6dc;box-shadow: 0px 0px 9px #13a6dc;',
  },
  legend: {
    data: ['水位', '流速', '雨量'],
  },
  grid: {
    left: 30,
    top: 40,
    right: 30,
    bottom: 25,
  },
  xAxis: {
    position: 'top',
    type: 'category',
    axisLabel: { show: false },
    data: xData.value,
    axisLine: {
      onZero: false,
    },
  },
  yAxis: {
    position: 'right',
    inverse: true,
    type: 'value',
    axisLine: { show: true },
    name: '雨量（mm）',
  },
  series: [
    {
      name: '流速',
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 10,
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
      type: 'line',
      itemStyle: {
        color: '#00ffc7',
        borderColor: '#ffffff',
      },
    },
    {
      name: '雨量',
      data: yData.value,
      type: 'bar',
      barWidth: '40%',
      itemStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: 'linear',
          global: false,
          colorStops: [
            {
              offset: 0, // 0%处的颜色
              color: '#23fde2',
            },
            {
              offset: 1, // 100%处的颜色
              color: '#0e87eb',
            },
          ],
        },
      },
    },
  ],
}))

const { domRef } = useEcharts(pieOptions)
</script>
<style lang="scss" scoped></style>
