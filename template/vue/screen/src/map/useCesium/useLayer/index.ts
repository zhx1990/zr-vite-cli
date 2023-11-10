import type { ShallowRef } from 'vue'
import { shallowRef, unref, toValue } from 'vue'
import * as Cesium from '@cesium/engine'
import SuperGif from '@/utils/superGif/index.js'
import { viewer } from '../useViewer'

export enum LAYER_GROUP_IDS {
  TILESET_GROUP_LAYER = 'TILESET_GROUP_LAYER',
  HTML_GROUP_LAYER = 'HTML_GROUP_LAYER',
  OVERLAY_GROUP_LAYER = 'OVERLAY_GROUP_LAYER',
  PRIMITIVE_GROUP_LAYER = 'PRIMITIVE_GROUP_LAYER',
  GEOJSON_GROUP_LAYER = 'GEOJSON_GROUP_LAYER',
}
export enum LAYER_IDS {
  // 站点图层
  SITE_LAYER = 'SITE_LAYER',
}

export const tilesetLayerGroup = shallowRef<DC.LayerGroup>()
export const htmlLayerGroup = shallowRef<DC.LayerGroup>()
export const vectorLayerGroup = shallowRef<DC.LayerGroup>()
export const primitiveLayerGroup = shallowRef<DC.LayerGroup>()
export const geojsonLayerGroup = shallowRef<DC.LayerGroup>()

export function useLayer() {
  const _initLayer = () => {
    tilesetLayerGroup.value = new DC.LayerGroup(LAYER_GROUP_IDS.TILESET_GROUP_LAYER)
    tilesetLayerGroup.value.attr = {
      name: 'TILESET-图层组',
    }
    viewer.value?.addLayerGroup(tilesetLayerGroup.value)

    htmlLayerGroup.value = new DC.LayerGroup(LAYER_GROUP_IDS.HTML_GROUP_LAYER)
    htmlLayerGroup.value.attr = {
      name: 'HTML-图层组',
    }
    viewer.value?.addLayerGroup(htmlLayerGroup.value)

    vectorLayerGroup.value = new DC.LayerGroup(LAYER_GROUP_IDS.OVERLAY_GROUP_LAYER)
    vectorLayerGroup.value.attr = {
      name: 'OVERLAY-图层组',
    }
    viewer.value?.addLayerGroup(vectorLayerGroup.value)

    primitiveLayerGroup.value = new DC.LayerGroup(LAYER_GROUP_IDS.PRIMITIVE_GROUP_LAYER)
    primitiveLayerGroup.value.attr = {
      name: 'PRIMITIVE-图层组',
    }
    viewer.value?.addLayerGroup(primitiveLayerGroup.value)

    geojsonLayerGroup.value = new DC.LayerGroup(LAYER_GROUP_IDS.GEOJSON_GROUP_LAYER)
    geojsonLayerGroup.value.attr = {
      name: 'GEOJSON-图层组',
    }
    viewer.value?.addLayerGroup(geojsonLayerGroup.value)
  }

  const getLayer = (id: string) => {
    const layer = viewer.value?.getLayer(id)
    return layer
  }

  const getLayerGroupById = (id: string) => {
    const layerGroup = viewer.value?.getLayerGroup(id)
    return layerGroup
  }

  const setupLayer = () => {
    _initLayer()
  }

  return {
    LAYER_IDS,
    LAYER_GROUP_IDS,
    tilesetLayerGroup,
    htmlLayerGroup,
    vectorLayerGroup,
    primitiveLayerGroup,
    geojsonLayerGroup,
    setupLayer,
    getLayer,
    getLayerGroupById,
  }
}
