/*
 * @Author: {haoxian1990} 149322439@qq.com
 * @Date: 2023-09-08 10:48:50
 * @LastEditors: {haoxian1990} 149322439@qq.com
 * @LastEditTime: 2023-09-12 17:55:09
 * @Description: 获取全局缩放比例
 */

import { type Ref, onMounted, onUnmounted, ref, nextTick } from 'vue'
import { throttle } from 'lodash'

export function useScreenZoom() {
  const elRef = ref<HTMLElement | any>(null)
  const zoomValue = ref(0)
  const CLASS_NAME_ENUM = (className) => [
    [() => className.includes('base-map'), _setMapZoom],
    [() => className.includes('base-div-icon'), _setDivIconZoom],
  ]

  const getBodyZoom = () => {
    const el = document.querySelector('#body') as any
    const { zoom } = el.style
    zoomValue.value = Number(zoom)
    return zoom
  }

  const getBodyScale = () => {
    const el = document.querySelector('#body') as any
    const transform = el.getAttribute('transform')
    return transform
  }

  const countDefaultZoom = () => 1 / zoomValue.value

  /**
   * 设置zoom缩放比例
   * @return {*}
   * @description:  用于解决createVNode UI组件偏移问题
   */
  const setDomZoom = () => {
    if (!elRef.value) return
    getBodyZoom()
    const { className } = elRef.value
    const target = CLASS_NAME_ENUM(className).find((item) => item[0]())
    if (target) {
      setTimeout(() => {
        target[1]()
      }, 500)
    }
  }

  /**
   * 设置scale缩放比例
   * @param {Ref} domRef
   * @return {*}
   * @description:  用于解决echarts组件偏移问题，需要手动监听resize事件
   */
  const setDomScale = async (domRef: Ref) => {
    if (!domRef.value) return
    getBodyZoom()
    const scale = getBodyScale()

    setTimeout(() => {
      const canvasElement = domRef.value.getElementsByTagName('canvas')[0]
      canvasElement.style.zoom = countDefaultZoom()
      canvasElement.style.transform = scale
      canvasElement.style.transformOrigin = '0 0'
    }, 300)
  }

  /**
   * 设置覆盖物比例
   * @param {number} value
   * @return {*}
   * @description:
   */
  const setOverlayProportion = (value: number) => value * zoomValue.value

  function _setDivIconZoom() {
    const divIcon = elRef.value?.parentElement
    elRef.value.style.zoom = zoomValue.value
    divIcon.style.top = `-${150 * zoomValue.value}px`
  }
  function _setMapZoom() {
    elRef.value!.style.zoom = countDefaultZoom()
  }

  const thFn = throttle(setDomZoom, 300)
  onMounted(() => {
    getBodyZoom()
    if (!elRef.value) return
    window.addEventListener('resize', thFn)
  })
  onUnmounted(() => {
    window.removeEventListener('resize', thFn)
  })

  return {
    elRef,
    zoomValue,
    getBodyZoom,
    getBodyScale,
    setDomZoom,
    countDefaultZoom,
    setDomScale,
    setOverlayProportion,
  }
}
