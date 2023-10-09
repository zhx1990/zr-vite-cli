import * as DC from '@/plugins/dc-sdk/modules/index.js'
import '@/plugins/dc-sdk/themes'

export function setupCesium() {
  window.CESIUM_BASE_URL = './cesium'
  window.DC = DC
}
