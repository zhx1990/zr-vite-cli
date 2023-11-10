import { nextTick } from 'vue'
import { defineStore } from 'pinia'

interface State {
  // 地图模式
  mapMode: '2D-VEC' | '2D-IMG' | '2D-TER' | '3D'
  // 图层控制
  layerControl: number[]
}

export const useMapStore = defineStore('map-store', {
  state: (): State => ({
    mapMode: '2D-IMG',
    layerControl: [1, 2, 3, 4, 5, 6],
  }),
  actions: {
    setMapMode(mode: State['mapMode']) {
      this.mapMode = mode
    },
  },
})
