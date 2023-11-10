import { createApp, watch } from 'vue'
import { isReady } from '@/map'
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
import App from './App.vue'
import { setupDirectives } from './directives'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupI18n } from './locales'

async function setupApp() {
  setupAssets()
  // app loading
  const appLoading = createApp(BaseAppLoading)

  appLoading.mount('#appLoading')

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

  // mount app
  app.mount('#app')

  setupAmfeFlexible()

  const unwatch = watch(
    () => isReady.value,
    (value) => {
      if (value) {
        appLoading.unmount()
        unwatch()
      }
    }
  )
}

setupApp()
