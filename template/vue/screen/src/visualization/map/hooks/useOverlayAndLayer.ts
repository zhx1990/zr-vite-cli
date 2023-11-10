import { vNodeToDom } from '@/utils'
import { isFunction } from 'lodash'
import { ShallowRef, inject } from 'vue'
import * as Cesium from '@cesium/engine'
import SiteMark from '../BaseMap/components/SiteMark/SiteMark.vue'
import SiteMarkTip from '../BaseMap/components/SiteMark/SiteMarkTip.vue'
import { LAYER_IDS } from '../LAYER_IDS'

export function useOverlayAndLayer(options: {
  vectorLayerGroup: ShallowRef<DC.LayerGroup | undefined>
  geojsonLayerGroup: ShallowRef<DC.LayerGroup | undefined>
}) {
  const siteLayer = new DC.HtmlLayer(LAYER_IDS.SITE_LAYER)
  const siteTipLayer = new DC.HtmlLayer(LAYER_IDS.SITE_TIP_LAYER)
  let riverCourseLayer

  const _siteMarkTipOverlay = (props) => {
    const { lng, lat, legendType } = props
    const el = vNodeToDom({
      component: SiteMarkTip,
      componentProps: {
        ...props,
        isOffsetBottom: true,
      },
    })
    const pos = new DC.Position(lng, lat, 100)
    const overlay = new DC.DivIcon(pos, el)
    overlay.attr = {
      name: '站点Tip-覆盖物',
      legendType,
    }
    return overlay
  }
  const _siteMarkOverlay = (props) => {
    const { lng, lat, legendType, click } = props
    const pos = new DC.Position(lng, lat, 100)
    const el = vNodeToDom({
      component: SiteMark,
      componentProps: {
        ...props,
      },
    })
    const overlay = new DC.DivIcon(pos, el) as any
    overlay.attr = {
      name: '站点-覆盖物',
      legendType,
    }
    if (isFunction(click)) {
      overlay._delegate.addEventListener('click', () => {
        click(props)
      })
      // overlay.on(DC.MouseEventType.LEFT_DOWN, () => {
      //   console.log('props :>> ', props)
      //   // click(props)
      // })
    }
    return overlay
  }
  const siteMarkOverlay = (props) => {
    const pointTip = _siteMarkTipOverlay(props)
    const point = _siteMarkOverlay(props)

    return {
      pointTip,
      point,
    }
  }

  const siteMarkLayer = (data: Object[]) => {
    data.forEach((item) => {
      const { pointTip, point } = siteMarkOverlay({ ...item })
      siteTipLayer.addOverlay(pointTip)
      siteLayer.addOverlay(point)
    })
    options.vectorLayerGroup.value?.addLayer(siteTipLayer)
    options.vectorLayerGroup.value?.addLayer(siteLayer)
  }

  const siteMarkLayerShowControl = () => {
    siteLayer.eachOverlay((overlay) => {
      overlay.show = false
    })
    siteTipLayer.eachOverlay((overlay) => {
      overlay.show = false
    })
    if (riverCourseLayer) {
      riverCourseLayer.show = false
    }
  }

  const createRiverCourseLayer = () => {
    riverCourseLayer = new DC.GeoJsonLayer(LAYER_IDS.RIVER_COURSE_LAYER, '/geojson/河道岸线.json', {
      clampToGround: true,
      fill: Cesium.Color.AQUA,
    })
    riverCourseLayer.show = false
    options.geojsonLayerGroup.value?.addLayer(riverCourseLayer)
  }

  return {
    siteMarkLayer,
    siteMarkLayerShowControl,
    createRiverCourseLayer,
  }
}
