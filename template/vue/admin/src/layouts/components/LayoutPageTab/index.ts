import LayoutPageTab from './src/index.vue'
import $ButtonTab from './src/components/ButtonTab.vue'
import $ChromeTab from './src/components/ChromeTab.vue'

/**
 * @deprecated 请使用 PageTab
 */
const AdminTab = LayoutPageTab

/** @deprecated 请使用PageTab 设置mode="button" */
const ButtonTab = $ButtonTab

/** @deprecated 请使用PageTab 设置mode="chrome" */
const ChromeTab = $ChromeTab

export { LayoutPageTab, AdminTab, ButtonTab, ChromeTab }
export type { TabProps, TabMode } from './types'
