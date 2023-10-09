import { ref } from 'vue'
import { LEGEND_TYPE_2 } from '@/config'

export type LegendType = Common.OptionWithKey<string | number>[] & { icon: string }[]
export type LayerType = ({ value: number; icon: string; label: string } | undefined)[]
export type TileType = Common.OptionWithKey<string | number>[] & { thumb: string }[]
export const legendControlData = ref<LegendType>([])
export const layerControlData = ref<LayerType>([])
export const tileControlData = ref<TileType>([])

export function useLegend() {
  tileControlData.value = LEGEND_TYPE_2
  const setLegendControlData = (data: LegendType) => {
    legendControlData.value = data
  }
  const setLayerControlData = (data: LayerType) => {
    data?.forEach((item) => {
      const index = layerControlData.value.findIndex((i) => i?.label === item?.label)
      if (index) {
        layerControlData.value.push(item)
      }
    })
  }

  return {
    layerControlData,
    legendControlData,
    tileControlData,
    setLegendControlData,
    setLayerControlData,
  }
}
