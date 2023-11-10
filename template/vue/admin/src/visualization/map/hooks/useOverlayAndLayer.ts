import { vNodeToDom } from '@/utils'
import { isFunction } from 'lodash'
import type { Component, ShallowRef } from 'vue'
import { LAYER_IDS, OVERLAY_ATTR_NAME } from '../LAYER_OVERLAY_IDS'

export function useOverlayAndLayer(options: {
  vectorLayerGroup: ShallowRef<DC.LayerGroup | undefined>
  htmlLayerGroup: ShallowRef<DC.LayerGroup | undefined>
}) {
  // 站点覆盖物
  const _sitePointOverlay = (props: { data: any; component: Component }) => {
    const { data, component } = props
    const { lng, lat, legendType } = data
    // console.log('data :>> ', data)
    const el = vNodeToDom({
      component,
      componentProps: {
        data,
      },
    })
    const pos = new DC.Position(lng, lat, 1000)
    const overlay = new DC.DivIcon(pos, el)
    overlay.attr = {
      name: OVERLAY_ATTR_NAME.SITE_POINT,
      legendType,
    }
    overlay.setStyle({
      scaleByDistance: {
        near: 0, // 最近距离
        nearValue: 1, // 最近距离值
        far: 100000, // 最远距离值
        farValue: 1, // 最远距离值
      }, // 根据距离设置比例
      distanceDisplayCondition: {
        near: 0, // 最近距离
        far: Number.MAX_VALUE, // 最远距离
      }, // 根据距离设置可见
    })

    return overlay
  }

  const sitePointLayer = (props: { data: any; component: Component }) => {
    const layer = new DC.HtmlLayer(LAYER_IDS.SITE_LAYER)
    props.data.forEach((item) => {
      const overlay = _sitePointOverlay({ data: item, component: props.component })
      layer.addOverlay(overlay)
    })
    options.htmlLayerGroup.value?.addLayer(layer)
  }

  return {
    sitePointLayer,
  }
}
