import {
  PAGE_DIR,
  PAGE_GLOB,
  ROUTE_DTS,
  ROUTE_MODULE_DIR,
  ROUTE_MODULE_EXT,
  ROUTE_MODULE_TYPE,
} from './constant'
import type { PluginOption, ContextOption } from '../types'

/**
 * create plugin options
 * @param options user custom options for plugin
 */
export function createPluginOptions(userOptions: Partial<PluginOption>, rootDir: string) {
  const IGNORE_UNDERLINE_REG = /^_([a-zA-Z]|[0-9]|$)+_*/

  const BUILTIN_ROUTE_MODULE = '_builtin'

  const options: ContextOption = {
    pageDir: PAGE_DIR,
    pageGlobs: PAGE_GLOB,
    routeDts: ROUTE_DTS,
    routeModuleDir: ROUTE_MODULE_DIR,
    routeModuleExt: ROUTE_MODULE_EXT,
    routeModuleType: ROUTE_MODULE_TYPE,
    routeNameTansformer: (name) => name.replace(IGNORE_UNDERLINE_REG, ''),
    lazyImport: () => true,
    onRouteModuleGenerate: (name) => !name.includes(BUILTIN_ROUTE_MODULE),
    rootDir,
  }

  Object.assign<ContextOption, Partial<PluginOption>>(options, userOptions)

  return options
}
