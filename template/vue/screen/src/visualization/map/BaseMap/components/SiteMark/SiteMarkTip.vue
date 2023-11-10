<template>
  <div ref="elRef" class="base-div-icon">
    <div
      class="content level-1"
      :class="[
        // props.warnStatus === 1 ? 'level-1' : 'level-2',
        props.isOffsetBottom ? 'bottom-120px' : 'bottom-0px',
      ]"
    >
      <div class="arrow-c"></div>
      <dl>
        <dt>{{ props.bdName }}</dt>
        <dd>
          站点编码:
          <span class="text-[#00d6e9]">
            {{ props.bdCode }}
          </span>
        </dd>
        <dd>
          站点类型:
          <span class="text-[#00d6e9]">
            {{ getLegendTypeByValue(props.legendType)?.label }}
          </span>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, nextTick, ref } from 'vue'
import { useRequest } from 'vue-request'
import { indexPointData } from '@/service'
import { LEGEND_TYPE_1, getLegendTypeByValue } from '@/config'

const props = defineProps<{
  id: string
  bdName: string
  legendType: number
  bdCode: string
  warnStatus?: number
  isOffsetBottom?: boolean
}>()

// const { data } = useRequest(indexPointData, {
//   defaultParams: [props.id],
//   onSuccess: (res) => {
//     console.log('res :>> ', res)
//   },
// })
</script>
<style lang="scss" scoped>
$level-1: rgba(0, 120, 217, 100%);
$level-1-opacity: rgba(0, 120, 217, 30%);
$level-1-border: rgba(0, 174, 255, 100%);
$level-2: rgba(181, 27, 1, 100%);
$level-2-opacity: rgba(181, 27, 1, 30%);
$level-2-border: rgba(255, 86, 59, 100%);

.base-div-icon {
  min-width: 200px;

  .content {
    position: relative;

    // bottom: 120px;
    left: 0;
    box-sizing: border-box;
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;

    // 绘制一个三角箭头，朝下

    dt {
      position: relative;
      display: flex;
      align-items: center;
      height: 30px;
      padding-left: 25px;
      margin-bottom: 10px;
      border-top-left-radius: 10px;

      &::after {
        position: absolute;
        top: 9px;
        left: 11px;
        width: 3px;
        height: 14px;
        content: '';
      }
    }

    dd {
      padding: 0 11px;
      padding-bottom: 10px;
    }

    .arrow-c {
      position: absolute;
      bottom: -10px;
      left: 93px;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
    }
  }

  .level-1 {
    background-color: $level-1-opacity;
    border-color: $level-1-border;
    box-shadow: 0 0 10px 0 $level-1;

    dt {
      background: linear-gradient(to right, $level-1, transparent);

      &::after {
        background-color: #00cafc;
      }
    }

    .arrow-c {
      border-top: 10px solid $level-1;
    }
  }

  .level-2 {
    background-color: $level-2-opacity;
    border-color: $level-2-border;
    box-shadow: 0 0 10px 0 $level-2;

    dt {
      background: linear-gradient(to right, $level-2, transparent);

      &::after {
        background-color: #ff563b;
      }
    }

    .arrow-c {
      border-top: 10px solid $level-2;
    }
  }
}
</style>
