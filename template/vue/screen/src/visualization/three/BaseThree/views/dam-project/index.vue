<template>
  <Widget>
    <template #left>
      <BaseCardLegendTag title="大坝属性信息" :data="legendData" />
    </template>
    <template #right>
      <SButton
        v-for="(item, index) in data"
        :key="index"
        class="mb-20px!"
        @click="handlerButton(item.click)"
      >
        <BaseSvgIcon :local-icon="item.svg" class="text-[#00aeff] mr-5px" />
        <span v-html="item.label"></span>
      </SButton>
    </template>
  </Widget>
</template>
<script lang="ts" setup>
import { useThreeStore } from '@/store'
import { useModal } from '~/src/hooks'
import { h, inject } from 'vue'
import { NTag } from 'naive-ui'
import { useThree } from '@/visualization/three'
import { Widget, FileSearch } from '../../components'

const threeStore = useThreeStore()
const { createDialog } = useModal()
const { THREE_PROVIDE_KEY } = useThree()

const three = inject(THREE_PROVIDE_KEY)

const legendData = [
  {
    label: '坝型',
    value: '大坝',
  },
  {
    label: '最大坝高/m',
    value: '80',
  },
  {
    label: '坝顶高程/m',
    value: '45.2',
  },
  {
    label: '防浪墙顶高程/m',
    value: '15.8',
  },
  {
    label: '防渗体顶高程/m',
    value: '45.2',
  },
  {
    label: '坝顶长度/m',
    value: '15.8',
  },
  {
    label: '坝顶宽度/m',
    value: '60.0',
  },
  {
    label: '坝基防渗型式',
    value: 'X',
  },
]

const data = [
  {
    label: '返回&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
    svg: 'return',
    click: () => threeStore.setIsShowThree(false),
  },
  {
    label: '图档案查询',
    svg: 'archives',
    click: () => {
      createDialog({
        title: '图档案查询',
        class: 'large-dialog',
        content: () => h(FileSearch),
      })
    },
  },
  {
    label: '报告汇编&nbsp;&nbsp;&nbsp;&nbsp;',
    svg: 'report',
  },
  {
    label: '飞行模式&nbsp;&nbsp;&nbsp;&nbsp;',
    svg: 'flight',
    click: () => {
      three?.cameraRotate()
    },
  },
]
const handlerButton = (fn: Function | undefined) => {
  fn && fn()
}
</script>
<style lang="scss" scoped></style>
