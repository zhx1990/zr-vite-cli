<template>
  <div ref="domRef" class="h-650px w-full"></div>
</template>
<script lang="ts" setup>
import { useEcharts, ECOption } from '@/hooks'
import { computed } from 'vue'

const xAxisData = ['1', '2', '3', '4', '5', '6', '7', '8']
const yAxisData1 = [40, 15, 12, 14, 10, 10, 16, 40]
const yAxisData2 = [22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3, 22.3]

const option = computed<ECOption>(
  () =>
    ({
      backgroundColor: '#fff',

      grid: {
        top: '10%',
        left: '3%',
        right: '1%',
        bottom: '9%',
      },
      xAxis: {
        show: true,
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          fontSize: 20,
        },
        data: xAxisData,
      },
      yAxis: {
        show: true,
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          fontSize: 20,
        },
      },
      series: [
        {
          type: 'line',
          label: {
            show: true,
            position: 'top',
            formatter: (params) => `${params.value}m`,
          },
          smooth: 'true',
          color: '#7b4d12',
          areaStyle: {
            color: '#7b4d12',
            opacity: 1,
          },
          data: yAxisData1,
          z: 1,
        },
        {
          type: 'line',
          color: '#00aaed',
          areaStyle: {
            color: '#00aaed',
            // "opacity":1
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params) => {
              if (params.dataIndex === Math.floor(yAxisData2.length / 2)) {
                return `水位${params.value}m`
              }
              return ''
            },
          },
          data: yAxisData2,
          z: 0,
        },
        {
          type: 'line',
          markLine: {
            data: [
              {
                lineStyle: {
                  color: 'red',
                },
                label: {
                  position: 'middle',
                  formatter: (params) => `${params.name}:${params.value}m`,
                },
                name: '保证水位',
                yAxis: 35,
              },
              {
                lineStyle: {
                  color: '#ff9900',
                },
                label: {
                  position: 'middle',
                  formatter: (params) => `${params.name}:${params.value}m`,
                },
                name: '警戒水位',
                yAxis: 30,
              },
            ],
          },
        },
      ],
    } as ECOption)
)

const { domRef } = useEcharts(option)
</script>
<style lang="scss" scoped></style>
