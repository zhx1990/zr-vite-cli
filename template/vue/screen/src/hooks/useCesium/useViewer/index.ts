import { shallowRef, toValue } from 'vue'
import { TDT_TOKEN } from '@/config/map-sdk'

export const viewer = shallowRef<DC.Viewer>()
export const terrain = shallowRef<TerrainProvider>()
export const measure = shallowRef<DC.Measure>()

export function useViewer() {
  const _createViewer = (cesiumRef: Common.MaybeRef<HTMLElement | null>) => {
    if (toValue(cesiumRef))
      viewer.value = new DC.Viewer(toValue(cesiumRef)!, {
        sceneMode: 2,
      })
    viewer.value?.setOptions({
      // targetFrameRate: 60, // 设置最大频率数
      // resolutionScale: window.devicePixelRatio, // 清晰度 0-1
      // maximumRenderTimeChange: Infinity, // 无操作时自动渲染帧率，设为数字会消耗性能，Infinity为无操作不渲染
      // useBrowserRecommendedResolution: true, // 是否选择浏览器推荐分辨率
      // maximumScreenSpaceError: 64, // 屏幕空间最大误差
      // terrainShadows: cesiumLib.value?.ShadowMode.DISABLED, // 地质接收阴影
      cameraController: {
        maximumZoomDistance: 80000,
      },
      // globe: {
      //   depthTestAgainstTerrain: true,
      // },
    })
  }

  const _createTerrain = () => {
    terrain.value = DC.TerrainFactory.createUrlTerrain({
      url: 'http://data.marsgis.cn/terrain',
    })
    viewer.value?.setTerrain(terrain.value)
  }

  const _createTDTImagery = () => {
    const cva = DC.ImageryLayerFactory.createTdtImageryLayer({
      key: TDT_TOKEN,
      style: 'cva',
    })
    const vec = DC.ImageryLayerFactory.createTdtImageryLayer({
      key: TDT_TOKEN,
      style: 'vec',
    })
    const cia = DC.ImageryLayerFactory.createTdtImageryLayer({
      key: TDT_TOKEN,
      style: 'cia',
    })
    const img = DC.ImageryLayerFactory.createTdtImageryLayer({
      key: TDT_TOKEN,
      style: 'img',
    })
    const cta = DC.ImageryLayerFactory.createTdtImageryLayer({
      key: TDT_TOKEN,
      style: 'cta',
    })
    const ter = DC.ImageryLayerFactory.createTdtImageryLayer({
      key: TDT_TOKEN,
      style: 'ter',
    })
    viewer.value?.addBaseLayer([img, cia])
    viewer.value?.addBaseLayer([vec, cva])
    viewer.value?.addBaseLayer([ter, cta])
  }
  // 标绘
  const _createMeasure = () => {
    measure.value = new DC.Measure(viewer.value!)
  }

  const setupViewer = (cesiumRef: Common.MaybeRef<HTMLElement | null>) => {
    _createViewer(cesiumRef)
    _createTDTImagery()
    _createTerrain()
    _createMeasure()
    const switchEl = document.querySelector('.map-switch') as HTMLElement
    switchEl.style.display = 'none'
    // @ts-ignore
    window.viewer = viewer.value
  }

  return {
    viewer,
    terrain,
    measure,
    setupViewer,
  }
}
