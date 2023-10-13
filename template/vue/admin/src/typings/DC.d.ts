declare interface ImageryProvider {
  defaultAlpha: number | undefined
  defaultBrightness: number | undefined
  defaultContrast: number | undefined
  defaultDayAlpha: number | undefined
  defaultGamma: number | undefined
  defaultHue: number | undefined
  defaultNightAlpha: number | undefined
  defaultSaturation: number | undefined
  readonly readyPromise: Promise<Boolean>
}

declare interface TerrainProvider {
  readonly readyPromise: Promise<Boolean>
}

declare interface Weather {
  readonly fog: any
  readonly rain: any
  readonly snow: any
  readonly cloud: any
}

declare interface Widget {
  enable: Boolean
  DEFAULT_MENU: Array<any>
  config: Common.Recordable

  setWrapper(wrapper: String | HTMLElement): Widget

  setContent(content: String | HTMLElement): Widget

  showAt(position: any, content: String | HTMLElement): Widget

  addBaseLayer(baseLayer: ImageryProvider, splitDirection?: number): Widget

  addTileset(tileset: any): Widget
}

declare namespace DC {
  export type CesiumModule = typeof import('@cesium/engine')
  export type EchartsModule = typeof import('echarts')
  export type TurfModule = typeof import('@turf/turf')
  export enum MouseEventType {
    LEFT_DOWN = 0,
    LEFT_UP = 1,
    CLICK = 2,
    DB_CLICK = 3,
    RIGHT_DOWN = 5,
    RIGHT_UP = 6,
    RIGHT_CLICK = 7,
    MOUSE_MOVE = 5,
    WHEEL = 16,
    MOUSE_OVER = 'mouseover',
    MOUSE_OUT = 'mouseout',
  }

  export enum SceneEventType {
    CAMERA_MOVE_END = 'cameraMoveEnd',
    CAMERA_CHANGED = 'cameraChanged',
    PRE_UPDATE = 'preUpdate',
    POST_UPDATE = 'postUpdate',
    PRE_RENDER = 'preRender',
    POST_RENDER = 'postRender',
    MORPH_COMPLETE = 'morphComplete',
    CLOCK_TICK = 'clockTick',
    RENDER_ERROR = 'renderError',
  }

  export enum ImageryType {
    AMAP = 'amap',
    BAIDU = 'baidu',
    GOOGLE = 'google',
    TDT = 'tdt',
    TENCENT = 'tencet',
    ARCGIS = 'arcgis',
    SINGLE_TILE = 'single_tile',
    WMS = 'wms',
    WMTS = 'wmts',
    XYZ = 'xyz',
    COORD = 'coord',
    GRID = 'grid',
    MAPBOX = 'mapbox',
    MAPBOX_STYLE = 'mapbox_style',
    TMS = 'tms',
  }

  export enum TerrainType {
    NONE = 'none',
    XYZ = 'xyz',
    ARCGIS = 'arcgis',
    GOOGLE = 'google',
    VR = 'vr',
  }

  export enum TrackViewMode {
    FP = '1',
    TP = '2',
    TRACKED = 'tracked',
    FREE = 'free',
  }

  export enum PositionEditorType {
    TRANSLATION = 'translation',
    ROTATION = 'rotation',
  }

  export enum MeasureType {
    ANGLE = 'angle',
    AREA = 'area',
    AREA_HEIGHT = 'area_height',
    AREA_SURFACE = 'area_surface',
    DISTANCE = 'distance',
    DISTANCE_SURFACE = 'diatance_surface',
    HEADING = 'heading',
    HEIGHT = 'height',
    TRIANGLE_HEIGHT = 'triangle_height',
  }

  export const Color: any

  export class DomUtil {
    static get(id: String): HTMLElement

    static getStyle(el: HTMLElement, style: Common.Recordable): any

    static create(tagName: String, className?: String, container?: HTMLElement): HTMLElement

    static remove(el: HTMLElement): void

    static empty(el: HTMLElement): void

    static hasClass(el: HTMLElement, name: String): Boolean

    static addClass(el: HTMLElement, name: String): void

    static removeClass(el: HTMLElement, name: String): void

    static setClass(el: HTMLElement, name: String): void

    static getClass(el: HTMLElement): String

    static createSvg(
      width: number,
      height: number,
      path: String,
      container?: HTMLElement
    ): SVGElement

    static parseDom(
      domStr: String,
      withWrapper?: Boolean,
      className?: String
    ): HTMLDivElement | Array<ChildNode>
  }

  export class Util {
    static uuid(prefix?: String): String

    static merge(dest: Common.Recordable, sources: any): Common.Recordable
  }

  export class Position {
    constructor(
      lng: number,
      lat: number,
      alt?: number,
      heading?: number,
      pitch?: number,
      roll?: number
    )

    lng: number
    lat: number
    alt: number
    heading: number
    pitch: number
    roll: number

    serialize(): Object

    distance(target: Position): number

    copy(): Position

    toArray(): Array<number>

    toObject(): Object

    static fromArray(arr: Array<number | String>): Position

    static fromString(str: String): Position

    static fromObject(obj: Object): Position

    static deserialize(valStr: Common.Recordable): Position
  }

  export class Parse {
    static parsePosition(position: String | Array<number> | Common.Recordable | Position): Position

    static parsePositions(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>
    ): Array<Position>

    static parsePointCoordToArray(
      position: String | Array<number> | Common.Recordable | Position
    ): Array<number>

    static parsePolylineCoordToArray(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>
    ): Array<Array<number>>

    static parsePolygonCoordToArray(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>
    ): Array<Array<Array<number>>>
  }

  export class Transform {
    static transformCartesianToWGS84(cartesian: any): Position

    static transformWGS84ToCartesian(position: Position): any

    static transformWGS84ToCartographic(position: Position): any

    static transformCartesianArrayToWGS84Array(cartesianArr: Array<any>): Array<Position>

    static transformWGS84ArrayToCartesianArray(WGS84Arr: Array<Position>): Array<any>

    static transformWGS84ToMercator(position: Position): Position

    static transformMercatorToWGS84(position: Position): Position

    static transformWindowToWGS84(position: Position, viewer: Viewer): Position

    static transformWGS84ToWindow(position: Position, viewer: Viewer): any
    static transformCartographicToWGS84(cartographic: any): Position
  }

  export class Math {
    static toDegrees(radians: number): number

    static toRadians(degrees: number): number

    static log2(num: number): number

    static area(positions: Array<Position>): number

    static bounds(positions: Array<Position>, expand?: number): number

    static center(positions: Array<Position>): Position

    static curve(positions: Array<Position>, options: Common.Recordable): Array<Position>

    static distance(positions: Array<Position>): number

    static heading(start: Position, end: Position): number

    static midPosition(start: Position, end: Position): Position

    static parabola(
      start: Position,
      end: Position,
      height?: number,
      count?: number
    ): Array<Array<number>>
  }

  export class JulianDate {
    constructor(julianDay?: number, secondsOfDay?: number, timeStandard?: any)

    static addDays(julianDate: JulianDate, days: number, result?: JulianDate): JulianDate

    static addHours(julianDate: JulianDate, hours: number, result?: JulianDate): JulianDate

    static addMinutes(julianDate: JulianDate, hours: number, result?: JulianDate): JulianDate

    static addSeconds(julianDate: JulianDate, seconds: number, result?: JulianDate): JulianDate

    static clone(julianDate: JulianDate, result?: JulianDate): JulianDate

    static daysDifference(left: JulianDate, right: JulianDate): number

    static greaterThan(left: JulianDate, right: JulianDate): Boolean

    static greaterThanOrEquals(left: JulianDate, right: JulianDate): Boolean

    static lessThan(left: JulianDate, right: JulianDate): Boolean

    static lessThanOrEquals(left: JulianDate, right: JulianDate): Boolean

    static now(result?: JulianDate): Boolean

    static secondsDifference(left: JulianDate, right: JulianDate): number
  }

  export class ImageryLayerFactory {
    static createAmapImageryLayer(
      options: Common.DeepPartial<
        import('@cesium/engine').UrlTemplateImageryProvider.ConstructorOptions
      > & {
        style?: 'img' | 'elec' | 'cva'
        protocol?: ''
        crs?: string
      }
    ): ImageryProvider

    static createBaiduImageryLayer(
      options: Common.DeepPartial<
        import('@cesium/engine').UrlTemplateImageryProvider.ConstructorOptions
      > & {
        style?: 'img' | 'vec' | 'custom' | 'traffic'
        protocol?: ''
        crs?: string
      }
    ): ImageryProvider

    static createGoogleImageryLayer(
      options: Common.DeepPartial<
        import('@cesium/engine').UrlTemplateImageryProvider.ConstructorOptions
      > & {
        style?: 'img' | 'vec' | 'ter' | 'elec' | 'img_cva'
        protocol?: ''
        crs?: string
      }
    ): ImageryProvider

    static createTdtImageryLayer(
      options: Common.DeepPartial<
        import('@cesium/engine').UrlTemplateImageryProvider.ConstructorOptions
      > & {
        style?: 'img' | 'vec' | 'cva' | 'cia' | 'ter' | 'cta' | 'ibo' | 'eva'
        protocol?: ''
        key: string
      }
    ): ImageryProvider

    static createTencentImageryLayer(
      options: Common.DeepPartial<
        import('@cesium/engine').UrlTemplateImageryProvider.ConstructorOptions
      > & {
        style?: 'img' | 'elec'
        protocol?: ''
      }
    ): ImageryProvider

    static createArcGisImageryLayer(
      options: import('@cesium/engine').ArcGisMapServerImageryProvider.ConstructorOptions & {
        url: string
      }
    ): ImageryProvider

    static createSingleTileImageryLayer(
      options: import('@cesium/engine').SingleTileImageryProvider.ConstructorOptions & {
        url: string
      }
    ): ImageryProvider

    static createWMSImageryLayer(
      options: import('@cesium/engine').WebMapTileServiceImageryProvider.ConstructorOptions
    ): ImageryProvider

    static createWMTSImageryLayer(
      options: import('@cesium/engine').WebMapTileServiceImageryProvider.ConstructorOptions
    ): ImageryProvider

    static createXYZImageryLayer(
      options: import('@cesium/engine').UrlTemplateImageryProvider.ConstructorOptions
    ): ImageryProvider

    static createCoordImageryLayer(
      options: import('@cesium/engine').TileCoordinatesImageryProvider.ConstructorOptions
    ): ImageryProvider

    static createGridImageryLayer(
      options: import('@cesium/engine').GridImageryProvider.ConstructorOptions
    ): ImageryProvider

    static createMapboxImageryLayer(
      options: import('@cesium/engine').MapboxImageryProvider.ConstructorOptions
    ): ImageryProvider

    static createMapboxStyleImageryLayer(
      options: import('@cesium/engine').MapboxStyleImageryProvider.ConstructorOptions
    ): ImageryProvider

    static createTMSImageryLayer(
      options: import('@cesium/engine').TileMapServiceImageryProvider.ConstructorOptions & {
        url: string
      }
    ): ImageryProvider

    static createImageryLayer(type: ImageryType, options: any): ImageryProvider
  }

  export class TerrainFactory {
    static createEllipsoidTerrain(options: any): TerrainProvider

    static createUrlTerrain(
      options?: import('@cesium/engine').CesiumTerrainProvider.ConstructorOptions & { url: string }
    ): TerrainProvider

    static createGoogleTerrain(
      options?: import('@cesium/engine').GoogleEarthEnterpriseTerrainProvider.ConstructorOptions & {
        url: string
      }
    ): TerrainProvider

    static createArcgisTerrain(
      options?: import('@cesium/engine').ArcGISTiledElevationTerrainProvider.ConstructorOptions & {
        url: string
      }
    ): TerrainProvider

    static createVRTerrain(
      options?: import('@cesium/engine').VRTheWorldTerrainProvider.ConstructorOptions & {
        url: string
      }
    ): TerrainProvider

    static createTerrain(type: TerrainType, options: { url: string }): TerrainProvider
  }

  export class Viewer {
    constructor(id: String | HTMLElement, options?: Common.Recordable)

    readonly delegate: any
    readonly dcContainer: HTMLElement
    readonly scene: any
    readonly camera: any
    readonly canvas: HTMLCanvasElement
    readonly dataSources: any
    readonly imageryLayers: any
    readonly terrainProvider: any
    readonly entities: any
    readonly postProcessStages: any
    readonly clock: any
    readonly cameraPosition: Position
    readonly resolution: number
    readonly viewBounds: any
    readonly level: number
    readonly weather: Weather
    readonly effect: Effect
    readonly compass: Widget
    readonly contextMenu: Widget
    readonly distanceLegend: Widget
    readonly hawkeyeMap: Widget
    readonly loadingMask: Widget
    readonly locationBar: Widget
    readonly mapSplit: Widget
    readonly mapSwitch: Widget
    readonly popup: Widget
    readonly sceneSplit: Widget
    readonly tilesetSplit: Widget
    readonly tooltip: Widget
    readonly zoomController: Widget
    readonly measure: Measure

    setOptions(options: Common.Recordable): Viewer

    setTerrain(terrain: TerrainProvider | null): Viewer

    setPitchRange(min?: number, Max?: number): Viewer

    changeSceneMode(sceneMode: number, duration?: number): Viewer

    changeMouseMode(mouseMode: number): Viewer

    addBaseLayer(baseLayers: any | Array<any>, options?: Common.Recordable): Viewer

    changeBaseLayer(index: number): Viewer

    getImageryLayerInfo(windowPosition: any): Promise<any>

    addTerrain(terrain: any, options?: Common.Recordable): Viewer

    changeTerrain(index: number): Viewer

    removeTerrain(): Viewer

    addLayerGroup(layerGroup: LayerGroup): Viewer

    removeLayerGroup(layerGroup: LayerGroup): Viewer

    getLayerGroup(id: String): LayerGroup

    addLayer(layer: Layer): Layer

    removeLayer(layer: Layer): Layer

    getLayer(id: String): Layer

    getLayers(): Array<Layer>

    eachLayer(method: Function, context: any): Viewer

    flyTo(targer: Overlay | Layer, duration?: number): Viewer

    zoomTo(targer: Overlay | Layer): Viewer

    flyToPosition(
      position: String | Array<number> | Common.Recordable | Position,
      completeCallback?: Function,
      duration?: number
    ): Viewer

    zoomToPosition(
      position: String | Array<number> | Common.Recordable | Position,
      completeCallback?: Function
    ): Viewer

    flyToBounds(
      bounds: String | Array<number>,
      hpr: Common.Recordable,
      completeCallback?: Function,
      duration?: number
    ): Viewer

    zoomToBounds(
      bounds: String | Array<number>,
      hpr: Common.Recordable,
      completeCallback?: Function
    ): Viewer

    on(type: String | number, callback: Function, context?: any): Viewer

    off(type: String | number, callback: Function, context?: any): Viewer

    destroy(): Viewer

    exportScene(name: String): Viewer

    use(plugin: any): Viewer
  }

  export class LayerGroup {
    constructor(id: String)

    readonly id: String
    readonly type: String
    readonly state: String
    attr: any
    show: Boolean

    addLayer(layer: Layer): LayerGroup

    removeLayer(layer: Layer): LayerGroup

    getLayer(id: String): Layer

    getLayers(): Array<Layer>

    addTo(viewer: Viewer): LayerGroup

    remove(): LayerGroup
  }

  export class Layer {
    constructor(id: String)

    readonly layerId: String
    readonly id: String
    readonly delegate: any
    readonly state: String
    show: Boolean
    attr: Object

    addOverlay(overlay: Overlay): Layer

    addOverlays(overlays: Array<Overlay>): Layer

    removeOverlay(overlay: Overlay): Layer

    getOverlay(overlayId: String): Overlay

    getOverlayById(id: String): Overlay

    getOverlaysByAttr(attrName: String, attrVal: any): Overlay

    eachOverlay(method: Function, context?: any): Layer

    getOverlays(): Array<Overlay>

    clear(): Layer

    remove(): Layer

    addTo(viewer: Viewer): Layer

    on(type: String | number, callback: Function, context: any): Layer

    off(type: String | number, callback: Function, context: any): Layer

    fire(type: String | number, params: Common.Recordable): Layer
  }

  export class ClusterLayer extends Layer {
    constructor(id: String, options?: Common.Recordable)
  }

  export class CzmlLayer extends Layer {
    constructor(id: String, url: String, options?: Common.Recordable)
  }

  export class DynamicLayer extends Layer {
    constructor(id: String)
  }

  export class FeatureGridLayer extends Layer {
    constructor(id: String, url: String, options?: Common.Recordable)
  }

  export class GeoJsonLayer extends Layer {
    constructor(id: String, url: String, options?: Common.Recordable)
  }

  export class GpxLayer extends Layer {
    constructor(id: String, url: String, options?: Common.Recordable)
  }

  export class GroundPrimitiveLayer extends Layer {
    constructor(id: String)
  }

  export class HtmlLayer extends Layer {
    constructor(id: String)
  }

  export class KmlLayer extends Layer {
    constructor(id: String, url: String, options?: Common.Recordable)
  }

  export class LabelLayer extends Layer {
    constructor(id: String)
  }

  export class PrimitiveLayer extends Layer {
    constructor(id: String)

    readonly points: any
    readonly labels: any
    readonly billboards: any
    readonly polylines: any
    readonly clouds: any
  }

  export class TilesetLayer extends Layer {
    constructor(id: String, url?: String, options?: Common.Recordable)
  }

  export class TopoJsonLayer extends Layer {
    constructor(id: String)
  }

  export class VectorLayer extends Layer {
    constructor(id: String)
  }

  export class HeatLayer extends Layer {
    constructor(id: String, options?: Common.Recordable)

    setPositions(positions: Array<Position>): HeatLayer

    addPosition(position: Position): HeatLayer
  }

  export class S3MLayer extends Layer {
    constructor(id: String, url: String, options: Common.Recordable)
  }

  export class ChartLayer extends Layer {
    constructor(id: String)

    readonly chart: any

    setOption(option: any): ChartLayer
  }

  export class WindLayer extends Layer {
    constructor(id: String, options: Common.Recordable)

    setData(data: any, options: Common.Recordable): WindLayer

    setOptions(options: Common.Recordable): WindLayer
  }

  export class MapvLayer extends Layer {
    constructor(id: String, options: Common.Recordable)

    setDataSet(dataSet: any): MapvLayer
  }

  export class CameraVideoLayer extends Layer {
    constructor(id: String)

    showHelp(show: Boolean, videoOverlay: Overlay, color: any): CameraVideoLayer
  }

  export class PlaneVideoLayer extends Layer {
    constructor(id: String)

    showHelp(show: Boolean, videoOverlay: Overlay, color: any): PlaneVideoLayer
  }

  export class Overlay {
    constructor()

    readonly overlayId: String
    readonly type: String
    readonly delegate: String
    readonly state: String
    show: Boolean
    id: String
    allowDrillPicking: Boolean
    contextMenu: Array<any>
    attr: Common.Recordable

    setLabel(text: String, textStyle: Common.Recordable): Overlay

    setStyle(style: Object): Overlay

    remove(): Overlay

    addTo(layer: Layer): Overlay

    on(type: String | number, callback: Function, context?: any): Overlay

    off(type: String | number, callback: Function, context?: any): Overlay

    fire(type: String | number, params: Common.Recordable): Overlay
  }

  export class CustomBillboard extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, icon: String)

    position: String | Array<number> | Common.Recordable | Position
    icon: String
    size: Array<number>

    setVLine(style: Common.Recordable): CustomBillboard

    setBottomCircle(
      radius: number,
      style: Common.Recordable,
      rotateAmount?: number
    ): CustomBillboard
  }

  export class CustomLabel extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, text: String)

    position: String | Array<number> | Common.Recordable | Position
    text: String

    setVLine(style: Common.Recordable): CustomLabel

    setBottomCircle(radius: number, style: Common.Recordable, rotateAmount?: number): CustomLabel
  }

  export class DynamicBillboard extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, icon: String)

    position: String | Array<number> | Common.Recordable | Position
    icon: String
    size: Array<number>
    maxCacheSize: number

    addPosition(position: Position, interval: number): DynamicBillboard
  }

  export class DynamicModel extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, modelUrl: String)

    position: String | Array<number> | Common.Recordable | Position
    modelUrl: String
    maxCacheSize: number

    addPosition(position: Position, interval: number): DynamicModel
  }

  export class DivIcon extends Overlay {
    constructor(
      position: String | Array<number> | Common.Recordable | Position,
      content: String | HTMLElement
    )

    position: String | Array<number> | Common.Recordable | Position
    content: String | HTMLElement

    static fromEntity(entity: any, content: String | HTMLElement): DivIcon
  }

  export class Model extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, modelUrl: String)

    position: String | Array<number> | Common.Recordable | Position
    modelUrl: String
    rotateAmount: number

    static fromEntity(entity: any, modelUrl: String): DivIcon
  }

  export class Tileset extends Overlay {
    constructor(url: String, options?: Common.Recordable)

    readonly readyPromise: Promise<any>

    setPosition(position: Position): Tileset

    setHeadingPitchRoll(heading: number, pitch: number, roll: number): Tileset

    clampToGround(): Tileset

    setHeight(height: number, isAbsolute?: Boolean): Tileset

    setScale(sacle: number): Tileset

    setProperties(properties: Common.Recordable): Tileset

    setCustomShader(fragmentShader: String): Tileset

    replaceFS(fragmentShader: String): Tileset

    setSplitDirection(splitDirection: number): Tileset
  }

  export class AttackArrow extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class DoubleArrow extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class FineArrow extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class GatheringPlace extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class TailedAttackArrow extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class BillboardPrimitive extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, icon: String)

    position: String | Array<number> | Common.Recordable | Position
    icon: String
    size: Array<number>
  }

  export class BounceBillboardPrimitive extends BillboardPrimitive {}

  export class BounceLabelPrimitive extends LabelPrimitive {}

  export class CloudPrimitive extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position)

    position: String | Array<number> | Common.Recordable | Position
  }

  export class DiffuseWallPrimitive extends Overlay {
    constructor(
      center: String | Array<number> | Common.Recordable | Position,
      radius: number,
      height: number
    )

    position: String | Array<number> | Common.Recordable | Position
    radius: number
    height: number
  }

  export class ElecEllipsoidPrimitive extends Overlay {
    constructor(
      center: String | Array<number> | Common.Recordable | Position,
      radius: Common.Recordable
    )

    position: String | Array<number> | Common.Recordable | Position
    radius: Common.Recordable
  }

  export class FlowLinePrimitive extends Overlay {
    constructor(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>,
      width?: number
    )

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class LabelPrimitive extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, text: String)

    position: String | Array<number> | Common.Recordable | Position
    text: String
  }

  export class LightCylinderPrimitive extends Overlay {
    constructor(
      center: String | Array<number> | Common.Recordable | Position,
      length: number,
      topRadius: number,
      bottomRadius: number
    )

    center: String | Array<number> | Common.Recordable | Position
    length: number
    topRadius: number
    bottomRadius: number
  }

  export class ModelCollectionPrimitive extends Overlay {
    constructor(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>,
      modelUrl: String
    )

    readonly readyPromise: Promise<any>
    attrs: Array<any>
    positions: String | Array<String | Array<number> | Common.Recordable | Position>
    modelUrl: String

    getModelInstance(instanceId: String): any

    getAttrByInstanceId(instanceId: String): any
  }

  export class ModelPrimitive extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, modelUrl: String)

    readonly readyPromise: Promise<any>
    position: String | Array<number> | Common.Recordable | Position
    modelUrl: String

    getMaterial(name: String): any

    getMesh(name: String): any

    getNode(name: String): any

    getNodes(): Array<any>
  }

  export class PointPrimitive extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position)

    position: String | Array<number> | Common.Recordable | Position
  }

  export class PolylinePrimitive extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class ScanCirclePrimitive extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, radius: number)

    position: String | Array<number> | Common.Recordable | Position
    radius: number
  }

  export class TrailLinePrimitive extends Overlay {
    constructor(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>,
      width?: number
    )

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class VideoPrimitive extends Overlay {
    constructor(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>,
      video: HTMLVideoElement
    )

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
    video: HTMLVideoElement
  }

  export class WaterPrimitive extends Overlay {
    constructor(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>,
      holes?: Array<String | Array<number> | Common.Recordable | Position>
    )

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class Billboard extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, icon: String)

    position: String | Array<number> | Common.Recordable | Position
    icon: String
    size: Array<number>
    show: Boolean
  }

  export class Box extends Overlay {
    constructor(
      position: String | Array<number> | Common.Recordable | Position,
      length: number,
      width: number,
      height: number
    )

    position: String | Array<number> | Common.Recordable | Position
    length: number
    width: number
    height: number
  }

  export class Circle extends Overlay {
    constructor(center: String | Array<number> | Common.Recordable | Position, radius: number)

    position: String | Array<number> | Common.Recordable | Position
    radius: number
  }

  export class Corridor extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class Cylinder extends Overlay {
    constructor(
      position: String | Array<number> | Common.Recordable | Position,
      length: number,
      topRadius: number,
      bottomRadius: number
    )

    position: String | Array<number> | Common.Recordable | Position
    length: number
    topRadius: number
    bottomRadius: number
  }

  export class Ellipse extends Overlay {
    constructor(
      position: String | Array<number> | Common.Recordable | Position,
      semiMajorAxis: number,
      semiMinorAxis: number
    )

    position: String | Array<number> | Common.Recordable | Position
    semiMajorAxis: number
    semiMinorAxis: number
  }

  export class Ellipsoid extends Overlay {
    constructor(
      position: String | Array<number> | Common.Recordable | Position,
      radius: Common.Recordable
    )

    position: String | Array<number> | Common.Recordable | Position
    radius: Common.Recordable
  }

  export class Label extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position, text: String)

    position: String | Array<number> | Common.Recordable | Position
    text: String
  }

  export class Plane extends Overlay {
    constructor(
      position: String | Array<number> | Common.Recordable | Position,
      width: number,
      height: number,
      plane: Object
    )

    position: String | Array<number> | Common.Recordable | Position
    width: number
    height: number
    distance: number
  }

  export class Point extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position)

    position: String | Array<number> | Common.Recordable | Position
  }
  export class Rect extends Overlay {
    constructor(position: String | Array<number> | Common.Recordable | Position)

    position: String | Array<number> | Common.Recordable | Position
  }

  export class Polygon extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
    center: Position
    static fromEntity(entity): Polygon
  }
  export class Polyline extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class PolylineVolume extends Overlay {
    constructor(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>,
      shape?: Array<any>
    )

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
    shape: Array<any>
  }

  export class Rectangle extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class Wall extends Overlay {
    constructor(positions: String | Array<String | Array<number> | Common.Recordable | Position>)

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
  }

  export class CameraVideo extends Overlay {
    constructor(
      position: String | Array<number> | Common.Recordable | Position,
      video: HTMLVideoElement,
      maskUrl?: String
    )

    position: String | Array<number> | Common.Recordable | Position
    video: HTMLVideoElement
    maskUrl: String
  }

  export class PlaneVideo extends Overlay {
    constructor(
      position: String | Array<number> | Common.Recordable | Position,
      video: HTMLVideoElement
    )

    position: String | Array<number> | Common.Recordable | Position
    video: HTMLVideoElement
  }

  export class Animation {
    constructor(viewer: Viewer)

    readonly type: String

    start(): Animation

    stop: Animation
  }

  export class AroundPoint extends Animation {
    constructor(viewer: Viewer, position: Position, options: Common.Recordable)
  }

  export class AroundView extends Animation {
    constructor(viewer: Viewer, options: Common.Recordable)
  }

  export class CircleScan extends Animation {
    constructor(viewer: Viewer, position: Position, radius: number, options: Common.Recordable)
  }

  export class Flying extends Animation {
    constructor(viewer: Viewer, options: Common.Recordable)
  }

  export class GlobeRotate extends Animation {
    constructor(viewer: Viewer, options: Common.Recordable)
  }

  export class RadarScan extends Animation {
    constructor(viewer: Viewer, position: Position, radius: number, options: Common.Recordable)
  }

  export class Effect {
    readonly blackAndWhite: any
    readonly bloom: any
    readonly brightness: any
    readonly depthOfField: any
    readonly lensFlare: any
    readonly night: any
    readonly silhouette: any
  }

  export class GroundSkyBox {
    constructor(options: Common.Recordable)
  }

  export class TrackController {
    constructor(viewer: Viewer)

    readonly delegate: any
    readonly state: String

    addTrack(track: Track): TrackController

    getTrack(id: String): Track

    removeTrack(track: Track): TrackController

    getTracks(): Array<Track>

    play(): TrackController

    pause(): TrackController

    restore(): TrackController

    viewTrack(track: Track, viewOption: Common.Recordable): TrackController

    releaseTrack(track: Track): TrackController

    clear(): TrackController
  }

  export class Track {
    constructor(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>,
      duration: number,
      callback: Function,
      options?: Common.Recordable
    )

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
    duration: number

    addPosition(position: Position, duration: number): Track

    setModel(modelPath: String, style: Common.Recordable): Track

    setBillboard(icon: String, style: Common.Recordable): Track

    setLabel(text: String, style: Common.Recordable): Track

    setPath(visible: Boolean, style: Common.Recordable): Track
  }

  export class CircleBlurMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class CircleDiffuseMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class CircleFadeMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class CirclePulseMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class CircleScanMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class CircleSpiralMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class CircleVaryMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class CircleWaveMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class EllipsoidElectricMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class EllipsoidTrailMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class PolylineEmissionMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class PolylineFlickerMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class PolylineFlowMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class PolylineImageTrailMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class PolylineLightingMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class PolylineLightingTrailMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class PolylineTrailMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class RadarLineMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class RadarSweepMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class RadarWaveMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class WallImageTrailMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class WallLineTrailMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class WaterMaterialProperty {
    constructor(options: Common.Recordable)
  }

  export class Plot {
    constructor(viewer: Viewer, options: Common.Recordable)

    readonly viewer: Viewer
    readonly layer: any
    readonly state: String

    draw(type: String, callback?: Function, style?: Common.Recordable, clampToModel?: Boolean): Plot

    edit(overlay: Overlay, callback?: Function, clampToModel?: Boolean): Plot

    stop(): Plot

    destroy(): Plot
  }

  export class RoamingController {
    constructor(viewer: Viewer)

    addPath(path: RoamingPath): RoamingController

    addPaths(paths: Array<RoamingPath>): RoamingController

    removePath(path: RoamingPath): RoamingController

    getPath(id: String): RoamingPath

    getPaths(): Array<RoamingPath>

    activate(path: RoamingPath, viewOption: Common.Recordable): RoamingController

    deactivate(): RoamingController

    clear(): RoamingController
  }

  export class RoamingPath {
    constructor(
      positions: String | Array<String | Array<number> | Common.Recordable | Position>,
      duration: number,
      pathMode?: String
    )

    positions: String | Array<String | Array<number> | Common.Recordable | Position>
    duration: number
    pathMode?: String
  }

  export class Analysis {
    constructor(viewer: Viewer)

    contourLine(lineColor: any, lineWidth: number, lineSpacing: number): Analysis

    shadows(startTime: Date, multiplier: number): Analysis

    sightLine(
      startPosition: Position,
      endPosition: Position,
      excludes?: Array<any>,
      lerpNum?: number
    ): Analysis

    sightCircle(center: Position, radius: number, excludes?: Array<any>, lerpNum?: number): Analysis

    viewshed(
      position: Position,
      radius: number,
      fov?: number,
      aspectRatio?: number,
      options?: Common.Recordable
    ): Analysis
  }

  export class ModelManager {
    constructor(viewer: Viewer, models: Array<Model>, options: Common.Recordable)

    models: Array<Model>

    spread(height?: number, seconds?: number, type?: number): ModelManager

    combine(seconds?: number): ModelManager

    showModel(index: number): ModelManager
  }

  export class PositionEditor {
    constructor(viewer: Viewer, options: Common.Recordable)

    overlay: Overlay

    activate(type: PositionEditorType, callback: Function): PositionEditor

    deactivate(): PositionEditor
  }

  export class Measure {
    constructor(viewer: Viewer)

    activate(type: MeasureType, options?: Common.Recordable): Measure

    deactivate(): Measure
  }

  export function mixin(DC: any): void

  export function use(plugin: any): void

  export function init(callback: Function): void

  export function ready(config?: {
    Cesium?: CesiumModule
    echarts?: EchartsModule
    turf?: TurfModule
    baseUrl?: string
    accessToken?: string
    logoImage?: string
    logoSize?: number[]
  }): Promise<any>

  export function registerLib(name: string, lib: any): void

  export function getLib(name: 'Cesium'): CesiumModule
  export function getLib(name: 'echarts'): EchartsModule
  export function getLib(name: 'turf'): TurfModule
}
