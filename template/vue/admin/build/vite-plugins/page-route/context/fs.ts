import {
  getRenamedDirConfig,
  getDelDirConfig,
  getAddDirConfig,
  getDelFileConfig,
  getAddFileConfig,
  getRouteModuleNameByRouteName,
  getRoutePathFromName,
  getRouteModuleNameByGlob,
  getRouteModuleWhetherFileExist,
  getSingleRouteModulesFromGlob,
  mergeFirstDegreeRouteModule,
  getRouteNameByGlobWithTransformer,
  recurseRemoveModuleByNames,
  useFsExtra,
} from '../shared'
import type {
  ContextOption,
  RouteConfig,
  FileWatcherDispatch,
  FileWatcherHooks,
  FileWatcherEvent,
  RouteModule,
} from '../types'
import { generateRouteModuleCode } from './module'

export async function fileWatcherHandler(
  dispatchs: FileWatcherDispatch[],
  hooks: FileWatcherHooks
) {
  const dispatchWithCategory: Record<FileWatcherEvent, string[]> = {
    addDir: [],
    unlinkDir: [],
    add: [],
    unlink: [],
  }

  dispatchs.forEach((item) => {
    dispatchWithCategory[item.event].push(item.path)
  })

  const hasAddDir = dispatchWithCategory.addDir.length > 0
  const hasUnlinkDir = dispatchWithCategory.unlinkDir.length > 0
  const hasAdd = dispatchWithCategory.add.length > 0
  const hasUnlink = dispatchWithCategory.unlink.length > 0

  const { onRenameDirWithFile, onDelDirWithFile, onAddDirWithFile, onDelFile, onAddFile } = hooks

  const conditions: [boolean, () => Promise<void>][] = [
    [hasAddDir && hasUnlinkDir && hasAdd && hasUnlink, onRenameDirWithFile],
    [hasUnlinkDir && hasUnlink, onDelDirWithFile],
    [hasAddDir && hasAdd, onAddDirWithFile],
    [hasUnlink, onDelFile],
    [hasAdd, onAddFile],
  ]

  const [, callback] = conditions.find(([condition]) => condition) || [true, async () => {}]

  await callback()
}

export function createFWHooksOfGenDeclarationAndViews(
  dispatchs: FileWatcherDispatch[],
  routeConfig: RouteConfig,
  options: ContextOption
) {
  const hooks: FileWatcherHooks = {
    async onRenameDirWithFile() {
      const { oldRouteName, newRouteName, oldRouteFilePath, newRouteFilePath } =
        getRenamedDirConfig(dispatchs, options)

      routeConfig.names = routeConfig.names.map((name) => name.replace(oldRouteName, newRouteName))

      routeConfig.files = routeConfig.files.map((item) => {
        const name = item.name.replace(oldRouteName, newRouteName)
        const path = item.path.replace(oldRouteFilePath, newRouteFilePath)

        return {
          name,
          path,
        }
      })
    },
    async onDelDirWithFile() {
      const { delRouteName } = getDelDirConfig(dispatchs, options)

      routeConfig.names = routeConfig.names.filter((name) => !name.includes(delRouteName))
      routeConfig.files = routeConfig.files.filter((item) => !item.name.includes(delRouteName))
    },
    async onAddDirWithFile() {
      const config = getAddDirConfig(dispatchs, options)

      routeConfig.names = routeConfig.names.concat(config.names).sort()
      routeConfig.files = routeConfig.files
        .concat(config.files)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
    },
    async onDelFile() {
      const { delRouteNames } = getDelFileConfig(dispatchs, options)

      routeConfig.names = routeConfig.names.filter((name) =>
        delRouteNames.every((item) => !name.includes(item))
      )
      routeConfig.files = routeConfig.files.filter((item) =>
        delRouteNames.every((v) => !item.name.includes(v))
      )
    },
    async onAddFile() {
      const config = getAddFileConfig(dispatchs, options)

      routeConfig.names = routeConfig.names.concat(config.names).sort()
      routeConfig.files = routeConfig.files
        .concat(config.files)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
    },
  }

  return hooks
}

export function createFWHooksOfGenModule(
  dispatchs: FileWatcherDispatch[],
  routeConfig: RouteConfig,
  options: ContextOption
) {
  async function getRouteModule(
    moduleName: string,
    existModuleName: string,
    existCallback: (module: RouteModule, filePath: string) => Promise<RouteModule | null>
  ) {
    return getRouteModuleWhetherFileExist({
      moduleName,
      existModuleName,
      routeConfig,
      options,
      existCallback,
    })
  }

  const hooks: FileWatcherHooks = {
    async onRenameDirWithFile() {
      const { oldRouteName, newRouteName } = getRenamedDirConfig(dispatchs, options)
      if (!oldRouteName || !newRouteName) return
      const { remove } = await useFsExtra()

      const oldRoutePath = getRoutePathFromName(oldRouteName)
      const newRoutePath = getRoutePathFromName(newRouteName)
      const oldModuleName = getRouteModuleNameByRouteName(oldRouteName)
      const newModuleName = getRouteModuleNameByRouteName(newRouteName)

      const module = await getRouteModule(
        newModuleName,
        oldModuleName,
        async (routeModule, filePath) => {
          const moduleJson = JSON.stringify(routeModule)
          const updateModuleJson = moduleJson
            .replace(new RegExp(`"${oldRouteName}`, 'g'), `"${newRouteName}`)
            .replace(new RegExp(`${oldRoutePath}`, 'g'), newRoutePath)

          const existModule = JSON.parse(updateModuleJson) as RouteModule

          await remove(filePath)

          return existModule
        }
      )

      if (module) {
        await generateRouteModuleCode(newModuleName, module, options)
      }
    },
    async onDelDirWithFile() {
      const { remove } = await useFsExtra()
      const { delRouteName } = getDelDirConfig(dispatchs, options)
      const moduleName = getRouteModuleNameByRouteName(delRouteName)

      const globs = dispatchs
        .filter((dispatch) => dispatch.event === 'unlink')
        .map((dispatch) => dispatch.path)
      const routeNames = globs.map((glob) => getRouteNameByGlobWithTransformer(glob, options))

      const module = await getRouteModule(moduleName, moduleName, async (routeModule, filePath) => {
        if (delRouteName === moduleName) {
          await remove(filePath)

          return null
        }

        recurseRemoveModuleByNames(routeModule, routeNames)

        return routeModule
      })

      if (module) {
        await generateRouteModuleCode(moduleName, module, options)
      }
    },
    async onAddDirWithFile() {
      const globs = dispatchs
        .filter((dispatch) => dispatch.event === 'add')
        .map((dispatch) => dispatch.path)

      const moduleName = getRouteModuleNameByGlob(globs[0], options)

      const module = await getRouteModule(moduleName, moduleName, async (routeModule) => {
        globs.forEach((glob) => {
          const modules = getSingleRouteModulesFromGlob(glob, options)
          mergeFirstDegreeRouteModule(routeModule, modules)
        })

        return routeModule
      })

      if (module) {
        await generateRouteModuleCode(moduleName, module, options)
      }
    },
    async onDelFile() {
      const { remove } = await useFsExtra()
      const { delRouteNames } = getDelFileConfig(dispatchs, options)

      const globs = dispatchs
        .filter((dispatch) => dispatch.event === 'unlink')
        .map((dispatch) => dispatch.path)

      delRouteNames.forEach(async (delRouteName) => {
        const moduleName = getRouteModuleNameByRouteName(delRouteName)

        const routeNames = globs.map((glob) => getRouteNameByGlobWithTransformer(glob, options))

        const module = await getRouteModule(
          moduleName,
          moduleName,
          async (routeModule, filePath) => {
            if (delRouteName === moduleName) {
              await remove(filePath)

              return null
            }

            recurseRemoveModuleByNames(routeModule, routeNames)

            return routeModule
          }
        )

        if (module) {
          await generateRouteModuleCode(moduleName, module, options)
        }
      })
    },
    async onAddFile() {
      await this.onAddDirWithFile()
    },
  }

  return hooks
}
