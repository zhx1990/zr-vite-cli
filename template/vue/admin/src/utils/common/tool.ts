import { useDialog } from 'naive-ui'
import dayjs from 'dayjs'
import { isFunction } from 'lodash'
import { createVNode, defineComponent, h, render } from 'vue'

/** @description: 对await进行包装,方便进行错误捕获 */
export function awaitWrapper(promise: Promise<any>) {
  return Promise.resolve(promise)
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ data: null, error }))
}

/** @description: 模拟请求响应 */
export const mockResponse = (data: any) =>
  new Promise<any>((resolve) => {
    setTimeout(() => resolve(data), 500)
  })

export const createArray = (length: number, callback?: any) => {
  const arr = new Array(length).fill(0)
  return arr.map((item, index) => callback(index))
}

/** @description: 对await进行延时包装 */
export async function awaitDelay(promise: any, time = 500) {
  const start = new Date().getTime()
  await promise
  const end = new Date().getTime()
  const diff = end - start
  const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time))
  if (diff < time) {
    await delay(time - diff)
  }
}

/** @description: 确认框 */
export function confirmbox(title: string, callback?: Function) {
  const dialog = useDialog()
  return new Promise((resolve) => {
    dialog.success({
      title,
      content: `确认${title}吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        resolve(true)
      },
      onNegativeClick: () => {
        resolve(false)
      },
      onAfterLeave: async () => {
        isFunction(callback) && (await awaitDelay(callback()))
      },
    })
  })
}

/**
 * @description:实例化vue组件
 * @param {any} component
 * @param {any} props
 * @return {*}
 */
export const instantiatedComponent = (component: any, props: any) => {
  const newComponent = defineComponent({
    render() {
      return h(component, props)
    },
  })
  const instance = createVNode(newComponent)
  render(instance, document.createElement('div'))
  return instance
}

/**  @description: 日期格式化 */
export function dateFormater(date: any, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).isValid() ? dayjs(date).format(format) : '-'
}
