import { type Component, ref, provide } from 'vue'
import * as Cesium from '@cesium/engine'
import { type MapModeType } from '@/map'
import { useLayer, useOverlay, useViewer } from './index'

export const MAP_PROVIDE_KEY = 'BASE_MAP'
export const isReady = ref(false)
export function useMap() {
  const cesiumRef = ref<HTMLElement | null>(null)

  const { setupViewer, viewer } = useViewer()
  const {
    setupLayer,
    getLayer,
    getLayerGroupById,
    LAYER_GROUP_IDS,
    LAYER_IDS,
    htmlLayerGroup,
    geojsonLayerGroup,
    primitiveLayerGroup,
    tilesetLayerGroup,
    vectorLayerGroup,
  } = useLayer()

  const { toggleOverlay } = useOverlay()

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
    viewer.value!.destroy()
    setIsReady(false)
    viewer.value = undefined
    htmlLayerGroup.value = undefined
    geojsonLayerGroup.value = undefined
    primitiveLayerGroup.value = undefined
    tilesetLayerGroup.value = undefined
    vectorLayerGroup.value = undefined
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

  const setupCesium = () => {
    setupViewer(cesiumRef)
    setupLayer()
    viewer.value?.zoomToPosition(new DC.Position(119, 26, 80000))
    _onReady()
  }

  return {
    cesiumRef,
    MAP_PROVIDE_KEY,

    // viewer
    viewer,

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

    // map
    setupCesium,
    setIsReady,
    destroy,
    changeBaseLayer,
    getCurrentDistance,
    getCurrentLngLat,
  }
}
