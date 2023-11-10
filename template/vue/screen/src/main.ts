import { createApp, watch } from 'vue'
import { isReady } from '~/src/visualization/map'
import {
  setupNaive,
  setupWarnHandler,
  setupAssets,
  setupFastCrud,
  setupCustomFsType,
  setupCesium,
  setupAmfeFlexible,
} from '@/plugins'
import BaseAppLoading from '@/components/BaseAppLoading/BaseAppLoading.vue'
import { localStg, getRgbOfColor } from '@/utils'
import themeSettings from '@/settings/theme.json'
import App from './App.vue'
import { setupDirectives } from './directives'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupI18n } from './locales'

function addThemeColorCssVars() {
  const defaultColor = themeSettings.themeColor
  const themeColor = localStg.get('themeColor') || defaultColor

  const { r, g, b } = getRgbOfColor(themeColor)

  const cssVars = `--primary-color: ${r},${g},${b}`
  document.documentElement.style.cssText = cssVars
}

async function setupApp() {
  setupAssets()
  // app loading

  addThemeColorCssVars()

  const app = createApp(App)

  // store plugin: pinia
  setupStore(app)

  // vue custom directives
  setupDirectives(app)

  // vue router
  await setupRouter(app)

  setupI18n(app)

  setupNaive(app)

  setupFastCrud(app)

  setupCustomFsType()

  // setupWarnHandler(app)

  setupCesium()

  setupAmfeFlexible()

  app.mount('#app')
}

setupApp()
