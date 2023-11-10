import { ref, shallowRef, watch, type InjectionKey } from 'vue'
import * as Cesium from '@cesium/engine'
import { useLayer, useOverlay, useViewer, useLegend } from '@/hooks/useCesium'
import { TDT_TOKEN } from '@/config/map-sdk'
import { type MapModeType } from '../types'
import { LAYER_IDS } from '../LAYER_OVERLAY_IDS'
import { useOverlayAndLayer } from './useOverlayAndLayer'

export function useMap() {
  const cesiumRef = ref<HTMLElement | null>(null)

  const isReady = ref(false)
  const measure = shallowRef<DC.Measure>()
  const viewer = shallowRef<DC.Viewer>()
  const tilesetLayerGroup = shallowRef<DC.LayerGroup>()
  const htmlLayerGroup = shallowRef<DC.LayerGroup>()
  const vectorLayerGroup = shallowRef<DC.LayerGroup>()
  const primitiveLayerGroup = shallowRef<DC.LayerGroup>()
  const geojsonLayerGroup = shallowRef<DC.LayerGroup>()

  const { setupViewer, createTDTImagery, createCustomImagery, createMeasure } = useViewer()
  const { setupLayer, getLayer, getLayerGroupById, LAYER_GROUP_IDS } = useLayer(viewer)
  const {
    layerControlData,
    legendControlData,
    tileControlData,
    setLegendControlData,
    setLayerControlData,
  } = useLegend()

  const { toggleOverlay } = useOverlay()

  const { sitePointLayer } = useOverlayAndLayer({
    vectorLayerGroup,
    htmlLayerGroup,
  })

  const readyCesium = (callback: Function) => {
    watch(
      () => viewer.value,
      (val) => {
        if (val) {
          callback && callback(val)
        }
      }
    )
  }

  /**
   * 飞入位置
   * @description:
   * @param {DC} position
   * @param {Function} callback
   * @param {*} duration
   * @return {*}
   */
  const flyToPosition = (position: DC.Position, callback?: Function, duration = 1) => {
    viewer.value?.flyToPosition(position, callback, duration)
  }

  const flyTo = (overlay: DC.Overlay, duration = 1) => {
    viewer.value?.flyTo(overlay, duration)
  }
  const zoomTo = (overlay: DC.Overlay) => {
    viewer.value?.zoomTo(overlay)
  }
  const zoomToPosition = (position: DC.Position, callback?: Function) => {
    viewer.value?.zoomToPosition(position, callback)
  }
  const zoomToCenter = (position?: DC.Position) => {
    const pos = position ?? new DC.Position(118.11, 27.79, 100000, 0, -90, 0)
    viewer.value?.zoomToPosition(pos)
  }

  const sceneSplit = async (enable = true) => {
    viewer.value!.sceneSplit.enable = enable

    const cva = await DC.ImageryLayerFactory.createTdtImageryLayer({
      key: TDT_TOKEN,
      style: 'cva',
    })
    const vec = await DC.ImageryLayerFactory.createTdtImageryLayer({
      key: TDT_TOKEN,
      style: 'vec',
    })
    viewer.value!.sceneSplit.addBaseLayer(vec)
  }

  /* 比例尺 */
  const _createDistanceLegend = () => {
    viewer.value!.distanceLegend.enable = true
  }

  const _mode = (index: number) => {
    viewer.value?.changeBaseLayer(index)
    viewer.value?.changeSceneMode(2)
  }

  /* 修改基础图层 */
  const changeBaseLayer = (type: MapModeType) => {
    const enumType = {
      '2D-IMG': () => {
        _mode(0)
      },
      '2D-VEC': () => {
        _mode(1)
      },
      '2D-TER': () => {
        _mode(2)
      },
      '3D': () => {
        viewer.value?.changeBaseLayer(0)
        viewer.value?.changeSceneMode(3)
      },
    }
    if (enumType[type]) enumType[type]()
  }

  /* 获取当前坐标 */
  const getCurrentLngLat = () => {
    const position = viewer.value!.scene.camera.positionCartographic
    const { lng, lat } = DC.Transform.transformCartographicToWGS84(position)
    return { lng, lat }
  }

  const DISTANCE_BASE = [1, 2, 3, 5]
  const DISTANCE_VALUE = [
    ...DISTANCE_BASE,
    ...DISTANCE_BASE.map((item) => item * 10),
    ...DISTANCE_BASE.map((item) => item * 100),
    ...DISTANCE_BASE.map((item) => item * 1000),
    ...DISTANCE_BASE.map((item) => item * 10000),
    ...DISTANCE_BASE.map((item) => item * 100000),
    ...DISTANCE_BASE.map((item) => item * 1000000),
  ]
  /* 获取当前距离比例尺 */
  const getCurrentDistance = (geodesic: Cesium.EllipsoidGeodesic) => {
    const maxBarWidth = 100
    const { scene } = viewer.value!
    const { width, height } = scene.canvas

    const left = scene.camera.getPickRay(new Cesium.Cartesian2((width / 2) | 0, height - 1))
    const right = scene.camera.getPickRay(new Cesium.Cartesian2((1 + width / 2) | 0, height - 1))

    const { globe } = scene
    const leftPosition = globe.pick(left, scene)
    const rightPosition = globe.pick(right, scene)
    if (!leftPosition || !rightPosition) {
      return '0'
    }

    const leftCartographic = globe.ellipsoid.cartesianToCartographic(leftPosition)
    const rightCartographic = globe.ellipsoid.cartesianToCartographic(rightPosition)

    geodesic.setEndPoints(leftCartographic, rightCartographic)
    const pixelDistance = geodesic.surfaceDistance
    let distance = 0
    for (let i = DISTANCE_VALUE.length - 1; i >= 0; --i) {
      if (DISTANCE_VALUE[i] / pixelDistance < maxBarWidth) {
        distance = DISTANCE_VALUE[i]
        break
      }
    }
    const dis = distance >= 1000 ? `${distance / 1000} km` : `${distance} m`
    return dis
  }
  /* 是否加载完成 */
  const setIsReady = (value: boolean) => {
    isReady.value = value
  }

  /* 销毁 */
  const destroy = () => {
    viewer.value?.destroy()
    setIsReady(false)
    viewer.value = undefined
    htmlLayerGroup.value = undefined
    geojsonLayerGroup.value = undefined
    primitiveLayerGroup.value = undefined
    tilesetLayerGroup.value = undefined
    vectorLayerGroup.value = undefined
    layerControlData.value = []
    legendControlData.value = []
    tileControlData.value = []
  }

  /* 是否加载完成 */
  const _onReady = () => {
    const helper = new Cesium.EventHelper()
    helper.add(viewer.value!.scene.globe.tileLoadProgressEvent, (e) => {
      if (e === 0) {
        setIsReady(true)
        helper.removeAll()
      }
    })
  }

  const setupMap = () => {
    viewer.value = setupViewer(cesiumRef)
    // createCustomImagery()
    createTDTImagery()
    _createDistanceLegend()
    const l = setupLayer()
    htmlLayerGroup.value = l.htmlLayerGroup
    geojsonLayerGroup.value = l.geojsonLayerGroup
    primitiveLayerGroup.value = l.primitiveLayerGroup
    tilesetLayerGroup.value = l.tilesetLayerGroup
    vectorLayerGroup.value = l.vectorLayerGroup
    measure.value = createMeasure()
    viewer.value?.zoomToPosition(new DC.Position(119, 26, 80000))
    _onReady()
  }

  const MAP_PROVIDE_KEY: InjectionKey<{
    cesiumRef: typeof cesiumRef

    // viewer
    viewer: typeof viewer

    // controlData
    layerControlData: typeof layerControlData
    legendControlData: typeof legendControlData
    tileControlData: typeof tileControlData
    setLegendControlData: typeof setLegendControlData
    setLayerControlData: typeof setLayerControlData

    // layer
    LAYER_GROUP_IDS: typeof LAYER_GROUP_IDS
    LAYER_IDS: typeof LAYER_IDS
    htmlLayerGroup: typeof htmlLayerGroup
    geojsonLayerGroup: typeof geojsonLayerGroup
    primitiveLayerGroup: typeof primitiveLayerGroup
    tilesetLayerGroup: typeof tilesetLayerGroup
    vectorLayerGroup: typeof vectorLayerGroup
    getLayer: typeof getLayer
    getLayerGroupById: typeof getLayerGroupById

    // overlay
    toggleOverlay: typeof toggleOverlay
    sitePointLayer: typeof sitePointLayer

    // map
    setupMap: typeof setupMap
    setIsReady: typeof setIsReady
    destroy: typeof destroy
    changeBaseLayer: typeof changeBaseLayer
    getCurrentDistance: typeof getCurrentDistance
    getCurrentLngLat: typeof getCurrentLngLat
    sceneSplit: typeof sceneSplit
    flyToPosition: typeof flyToPosition
    flyTo: typeof flyTo
    zoomToCenter: typeof zoomToCenter
    zoomTo: typeof zoomTo
    zoomToPosition: typeof zoomToPosition
    readyCesium: typeof readyCesium
  }> = 'BASE_MAP' as any

  return {
    cesiumRef,
    MAP_PROVIDE_KEY,

    // viewer
    viewer,

    // controlData
    layerControlData,
    legendControlData,
    tileControlData,
    setLegendControlData,
    setLayerControlData,

    // layer
    LAYER_GROUP_IDS,
    LAYER_IDS,
    htmlLayerGroup,
    geojsonLayerGroup,
    primitiveLayerGroup,
    tilesetLayerGroup,
    vectorLayerGroup,
    getLayer,
    getLayerGroupById,

    // overlay
    toggleOverlay,
    sitePointLayer,

    // map
    setupMap,
    setIsReady,
    destroy,
    changeBaseLayer,
    getCurrentDistance,
    getCurrentLngLat,
    sceneSplit,
    flyToPosition,
    flyTo,
    zoomToCenter,
    zoomTo,
    zoomToPosition,
    readyCesium,
  }
}
