import type { App, ComponentPublicInstance } from 'vue'

export function setupWarnHandler(app: App) {
  app.config.warnHandler = (
    msg: string,
    instance: ComponentPublicInstance | null,
    trace: string
  ) => {
    if (msg.includes('privateSpan')) {
      return
    }
    console.warn(msg, instance, trace)
  }
}
