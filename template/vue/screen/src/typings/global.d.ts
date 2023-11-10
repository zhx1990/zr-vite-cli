/*
 * @Author: chenr 526963089@qq.com
 * @Date: 2023-10-27 11:03:35
 * @LastEditors: chenr 526963089@qq.com
 * @LastEditTime: 2023-11-09 16:07:33
 * @FilePath: /dx-screen/src/typings/global.d.ts
 * @Description:
 */
interface Window {
  CESIUM_BASE_URL: string
  $loadingBar?: import('naive-ui').LoadingBarProviderInst
  $dialog?: import('naive-ui').DialogProviderInst
  $message?: import('naive-ui').MessageProviderInst
  $notification?: import('naive-ui').NotificationProviderInst
  JSPlugin: any
}

interface ViewTransition {
  ready: Promise<void>
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition
}

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void]

  /** 选项数据 */
  type OptionWithKey<K> = { value: K; label: string }

  // vue
  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type MaybeRef<T> = T | import('vue').Ref<T>
  type Nullable<T> = T | null
  type NonNullable<T> = T extends null | undefined ? never : T
  type Recordable<T = any> = Record<string, T>
  type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  type Indexable<T = any> = {
    [key: string]: T
  }
  type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  type TimeoutHandle = ReturnType<typeof setTimeout>
  type IntervalHandle = ReturnType<typeof setInterval>

  interface ChangeEvent extends Event {
    target: HTMLInputElement
  }
  interface WheelEvent {
    path?: EventTarget[]
  }

  function parseInt(s: string | number, radix?: number): number

  function parseFloat(string: string | number): number
}

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string
