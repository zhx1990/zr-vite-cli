<template>
  <NSpace vertical>
    <LayerTooltipCollapse
      img-path="/images/systems/icon_layer.png"
      label="地图"
      panel-title="地图模式"
    >
      <LayerTooltipCollapseRadioGroup :data="LEGEND_TYPE_2" />
    </LayerTooltipCollapse>
    <LayerTooltipCollapse
      img-path="/images/systems/icon_layer.png"
      label="图层"
      panel-title="图层控制"
    >
      <LayerTooltipCollapseCheckboxGroup :data="layerData" @update:value="handleUpdateValue" />
    </LayerTooltipCollapse>
    <LayerTooltipCollapse
      img-path="/images/systems/icon_layer.png"
      label="工具"
      panel-title="标绘工具"
    >
      <LayerTooltipCollapsePlot :data="plotData" />
    </LayerTooltipCollapse>
    <slot></slot>
  </NSpace>
</template>
<script lang="ts" setup>
import { ref, computed, inject } from 'vue'
import { useMap } from '@/visualization/map'
import { LEGEND_TYPE_2, LEGEND_TYPE_1 } from '@/config'
import { useIconRender } from '@/hooks'
import {
  LayerTooltipCollapse,
  LayerTooltipCollapseRadioGroup,
  LayerTooltipCollapseCheckboxGroup,
  LayerTooltipCollapsePlot,
} from '../index'
import { IBaseLayerTooltipCollapsePlotData } from './types'

const { iconRender } = useIconRender()

const { MAP_PROVIDE_KEY } = useMap()

const map = inject(MAP_PROVIDE_KEY)

const layerData = computed(() => {
  const d = LEGEND_TYPE_1.map((item) => ({
    label: item.label,
    value: item.value,
    imgPath: item.icon ?? '',
  }))
  return d
})

const handleUpdateValue = (value: number[]) => {
  const tipLayer = map?.getLayer(map.LAYER_IDS.SITE_TIP_LAYER)
  const layer = map?.getLayer(map.LAYER_IDS.SITE_LAYER)
  map?.siteMarkLayerShowControl()
  // 隐藏要素
  const is300 = value.includes(300)
  // 水面
  const is100 = value.includes(100)
  if (is100) {
    const layer = map?.geojsonLayerGroup.value?.getLayer(map?.LAYER_IDS.RIVER_COURSE_LAYER)
    if (layer) {
      layer.show = true
      map?.flyTo(layer)
    }
  }
  value.forEach((legendType) => {
    layer?.eachOverlay((overlay) => {
      if (overlay.attr.legendType === legendType) {
        overlay.show = true
      }
    })
    tipLayer?.eachOverlay((overlay) => {
      if (overlay.attr.legendType === legendType && !is300) {
        overlay.show = true
      }
    })
  })
}

const plotData: IBaseLayerTooltipCollapsePlotData[] = [
  {
    tipLabel: '测面积',
    icon: iconRender({ icon: 'geo:turf-explode' }),
    onClick: () => {
      map?.measure.value?.activate(DC.MeasureType.AREA_SURFACE)
    },
  },
  {
    tipLabel: '测高',
    icon: iconRender({ icon: 'geo:turf-along' }),
    onClick: () => {
      map?.measure.value?.activate(DC.MeasureType.HEIGHT, {
        clampToModel: true,
      })
    },
  },
  {
    tipLabel: '测距',
    icon: iconRender({ icon: 'geo:turf-destination' }),
    onClick: () => {
      map?.measure.value?.activate(DC.MeasureType.DISTANCE_SURFACE)
    },
  },
  {
    tipLabel: '清空绘制',
    icon: iconRender({ icon: 'system-uicons:trash' }),
    onClick: () => {
      map?.measure.value?.deactivate()
    },
  },
]
</script>
<style lang="scss" scoped></style>
