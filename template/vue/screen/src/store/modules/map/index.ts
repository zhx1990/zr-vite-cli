import { nextTick } from 'vue'
import { defineStore } from 'pinia'

interface State {
  /** 地图模式 */
  mapMode: '2D-VEC' | '2D-IMG' | '2D-TER' | '3D'
}

export const useMapStore = defineStore('map-store', {
  state: (): State => ({
    mapMode: '2D-IMG',
  }),
  actions: {
    setMapMode(mode: State['mapMode']) {
      this.mapMode = mode
    },
  },
})
