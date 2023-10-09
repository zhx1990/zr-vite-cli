<template>
  <div class="w-full h-650px">
    <div class="text-18px font-bold mb-10px">基本信息</div>

    <div class="border-t-1px border-l-1px border-[#006199] mb-20px">
      <div class="flex justify-between leading-40px h-40px">
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          测站编码：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        >
          B0001
        </div>
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          测站名称：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        >
          测站01
        </div>
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          河流名称：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        >
          河流001
        </div>
      </div>

      <div class="flex justify-between leading-40px h-40px">
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          流域名称：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        >
          新溪流域
        </div>
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          经度：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        >
          119.6239
        </div>
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          纬度：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        >
          26.4532
        </div>
      </div>

      <div class="flex justify-between leading-40px h-40px">
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          基面高程：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        >
          4.49
        </div>
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          基面高程：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        ></div>
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          站类：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        ></div>
      </div>

      <div class="flex justify-between leading-40px h-40px">
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          隶属单位：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        >
          防汛
        </div>
        <div class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right">
          至河口地址：
        </div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        ></div>
        <div
          class="flex-1 -mt-1px -ml-1px bg-[#12304b] border-1px border-[#006199] text-right"
        ></div>
        <div
          class="flex-1 -mt-1px -ml-1px text-left color-[#00c0ff] px-10px border-1px border-[#006199]"
        ></div>
      </div>
    </div>
    <div class="text-18px font-bold mb-10px">设备信息</div>
    <NDataTable
      :columns="columns"
      :data="tableData"
      :max-height="400"
      :bordered="false"
      :scroll-x="500"
      :row-class-name="rowClass"
    />
  </div>
</template>
<script lang="ts" setup>
import { DataTableColumn } from 'naive-ui'

const rowClass = (rowData, index) => {
  if (index % 2) {
    return 'even-row'
  }
  return ''
}

const tableData = [
  {
    t1: '水位计',
    t2: '-',
    t3: '电源供电',
    t4: '2018-02-03',
    t5: '10年',
    t6: 'ZR-25315J',
  },
]

const columns: DataTableColumn[] = [
  {
    title: '设备名称',
    key: 't1',
    // width: 100,
    align: 'center',
  },
  {
    title: '厂家名称',
    key: 't2',
    // width: 80,
    align: 'center',
  },
  {
    title: '供电方式',
    key: 't3',
    // width: 100,
    align: 'center',
  },
  {
    title: '购置日期',
    key: 't4',
    // width: 50,
    align: 'center',
  },
  {
    title: '使用年限(月)',
    key: 't5',
    // width: 100,
    align: 'center',
  },
  {
    title: '设备序号',
    key: 't6',
    // width: 200,
    align: 'center',
  },
]
</script>
<style lang="scss" scoped></style>
