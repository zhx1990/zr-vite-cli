import { type InjectionKey, ref, provide, shallowRef, onMounted } from 'vue'
import * as Cesium from '@cesium/engine'
import { type MapModeType } from '@/visualization/map'
import { useLayer, useOverlay, useViewer } from '../index'
import { LAYER_IDS } from '../LAYER_IDS'
import { useOverlayAndLayer } from './useOverlayAndLayer'

export const isReady = ref(false)
export function useMap() {
  const cesiumRef = ref<HTMLElement | null>(null)
  const measure = shallowRef<DC.Measure>()
  const viewer = shallowRef<DC.Viewer>()
  const tilesetLayerGroup = shallowRef<DC.LayerGroup>()
  const htmlLayerGroup = shallowRef<DC.LayerGroup>()
  const vectorLayerGroup = shallowRef<DC.LayerGroup>()
  const primitiveLayerGroup = shallowRef<DC.LayerGroup>()
  const geojsonLayerGroup = shallowRef<DC.LayerGroup>()

  const {
    setupViewer,
    createTDTImagery,
    createArcGisImagery,
    createCompass,
    createMeasure,
    createTerrain,
    createDistanceLegend,
    createLocationBar,
  } = useViewer()
  const { setupLayer, getLayer, getLayerGroupById, LAYER_GROUP_IDS } = useLayer(viewer)
  const { siteMarkLayer, siteMarkLayerShowControl, createRiverCourseLayer } = useOverlayAndLayer({
    vectorLayerGroup,
    geojsonLayerGroup,
  })
  const { toggleOverlay } = useOverlay()

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

  const flyTo = (overlay: DC.Overlay | DC.Layer, duration = 1) => {
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

  const _mode = (index: number) => {
    viewer.value!.changeBaseLayer(index)
    viewer.value!.changeSceneMode(2)
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
    measure.value = undefined
    viewer.value = undefined
    tilesetLayerGroup.value = undefined
    htmlLayerGroup.value = undefined
    vectorLayerGroup.value = undefined
    primitiveLayerGroup.value = undefined
    geojsonLayerGroup.value = undefined
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

  const test = async () => {
    const silhouetteBlue = Cesium.PostProcessStageLibrary.createEdgeDetectionStage()
    silhouetteBlue.uniforms.color = Cesium.Color.BLUE
    silhouetteBlue.uniforms.length = 0.01
    silhouetteBlue.selected = []

    const silhouetteGreen = Cesium.PostProcessStageLibrary.createEdgeDetectionStage()
    silhouetteGreen.uniforms.color = Cesium.Color.LIME
    silhouetteGreen.uniforms.length = 0.01
    silhouetteGreen.selected = []

    viewer.value?.scene.postProcessStages.add(
      Cesium.PostProcessStageLibrary.createSilhouetteStage([silhouetteBlue, silhouetteGreen])
    )
    // const overlay = new DC.Tileset('/bim/tileset.json')
    // overlay.setHeight(500)
    // const layer = new DC.TilesetLayer('test')
    // overlay.on(DC.MouseEventType.CLICK, (e) => {
    //   console.log('e :>> ', e)
    //   silhouetteBlue.selected = [e.feature]
    // })

    const pos = new DC.Position(119, 26, 1000, 0, -90)
    // const overlay = new DC.Model(pos, '/bim/test1.glb')
    // overlay.setStyle({
    //   runAnimations: false,
    // })
    // const layer = new DC.VectorLayer('test')

    // overlay.on(DC.MouseEventType.CLICK, (e) => {
    //   console.log('e :>> ', e)
    // })

    const overlay = new DC.ModelPrimitive(pos, '/bim/test1.glb')
    const layer = new DC.PrimitiveLayer('test')
    const model = await overlay.delegate
    console.log(model)
    console.log(model.activeAnimations)
    model.readyEvent.addEventListener(() => {
      model.activeAnimations.addAll({
        loop: Cesium.ModelAnimationLoop.NONE,
        // removeOnStop: true,
      })
      const animations = model.activeAnimations
      const { length } = animations
      for (let i = 0; i < length; ++i) {
        // console.log(animations.get(i).name)
      }
    })

    overlay.on(DC.MouseEventType.CLICK, (e) => {
      console.log(viewer.value?.scene)
      // console.log(model.activeAnimations)
      // overlay.setStyle({
      //   runAnimations: true,
      // })
      console.log(overlay)
      console.log(overlay.delegate._runtime)
      console.log('e :>> ', e)
      // console.log(overlay.getNodes())
    })

    layer.addOverlay(overlay)
    viewer.value?.addLayer(layer)
    // viewer.value?.flyTo(layer)
    viewer.value?.zoomToPosition(pos)
  }

  const test1 = async () => {
    const overlay = new DC.Tileset('/bim/tileset.json')
    overlay.setHeight(100)
    const layer = new DC.TilesetLayer('tilesetTest')
    layer.addOverlay(overlay)
    viewer.value?.addLayer(layer)

    viewer.value?.zoomTo(overlay)
  }

  const setupMap = async () => {
    viewer.value = setupViewer(cesiumRef)
    createTDTImagery()
    // createArcGisImagery()
    const l = setupLayer()
    htmlLayerGroup.value = l.htmlLayerGroup
    geojsonLayerGroup.value = l.geojsonLayerGroup
    primitiveLayerGroup.value = l.primitiveLayerGroup
    tilesetLayerGroup.value = l.tilesetLayerGroup
    vectorLayerGroup.value = l.vectorLayerGroup
    // createTerrain()
    createCompass()
    createLocationBar()
    createDistanceLegend()
    measure.value = createMeasure()
    viewer.value?.zoomToPosition(new DC.Position(119.3466, 26.568, 80000))
    _onReady()

    createRiverCourseLayer()

    // test()
    // test1()
  }

  const MAP_PROVIDE_KEY: InjectionKey<{
    cesiumRef: typeof cesiumRef

    // viewer
    viewer: typeof viewer
    createCompass: typeof createCompass

    // layer
    LAYER_GROUP_IDS: typeof LAYER_GROUP_IDS
    htmlLayerGroup: typeof htmlLayerGroup
    geojsonLayerGroup: typeof geojsonLayerGroup
    primitiveLayerGroup: typeof primitiveLayerGroup
    tilesetLayerGroup: typeof tilesetLayerGroup
    vectorLayerGroup: typeof vectorLayerGroup
    getLayer: typeof getLayer
    getLayerGroupById: typeof getLayerGroupById

    // overlay
    toggleOverlay: typeof toggleOverlay

    // map
    LAYER_IDS: typeof LAYER_IDS
    measure: typeof measure
    setupMap: typeof setupMap
    setIsReady: typeof setIsReady
    destroy: typeof destroy
    changeBaseLayer: typeof changeBaseLayer
    getCurrentDistance: typeof getCurrentDistance
    getCurrentLngLat: typeof getCurrentLngLat
    siteMarkLayer: typeof siteMarkLayer
    siteMarkLayerShowControl: typeof siteMarkLayerShowControl
    flyToPosition: typeof flyToPosition
    flyTo: typeof flyTo
    zoomTo: typeof zoomTo
    zoomToPosition: typeof zoomToPosition
    zoomToCenter: typeof zoomToCenter
  }> = 'BASE_MAP' as any

  return {
    cesiumRef,
    MAP_PROVIDE_KEY,

    // viewer
    viewer,
    createCompass,

    // layer
    LAYER_GROUP_IDS,
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
    LAYER_IDS,
    measure,
    setupMap,
    setIsReady,
    destroy,
    changeBaseLayer,
    getCurrentDistance,
    getCurrentLngLat,
    siteMarkLayer,
    siteMarkLayerShowControl,
    flyToPosition,
    flyTo,
    zoomTo,
    zoomToPosition,
    zoomToCenter,
  }
}
