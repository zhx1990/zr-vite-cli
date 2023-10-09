import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { resetSetupStore } from './plugins'

export function setupStore(app: App) {
  const store = createPinia()
  store.use(createPersistedState({}))
  store.use(resetSetupStore)

  app.use(store)
}

export * from './modules'
export * from './subscribe'
