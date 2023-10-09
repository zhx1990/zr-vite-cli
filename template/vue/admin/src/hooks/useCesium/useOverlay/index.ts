import { vNodeToDom } from '@/utils'
import type { Component } from 'vue'

export enum OVERLAY_ATTR_NAME {
  SITE_POINT = '站点',
}

export function useOverlay() {
  // 站点覆盖物
  const sitePoint = (props: { data: any; component: Component }) => {
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

  const toggleOverlay = (overlay: DC.Overlay) => {
    overlay.show = !overlay.show
  }
  return {
    sitePoint,
    toggleOverlay,
  }
}
