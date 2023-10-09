import { colord, extend } from 'colord'
import type { RgbColor } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import type { KebabCase } from './types'

extend([mixPlugin])

/** Tab激活时的颜色 */
export const ACTIVE_COLOR = '#1890ff'

type Prefix = '--soy-'

export type CssVarsProps = {
  primaryColor: string
  primaryColor1: string
  primaryColor2: string
  primaryColorOpacity1: string
  primaryColorOpacity2: string
  primaryColorOpacity3: string
}

type CssVars = {
  [K in keyof CssVarsProps as `${Prefix}${KebabCase<K>}`]: string | number
}

function createCssVars(props: CssVarsProps) {
  const cssVars: CssVars = {
    '--soy-primary-color': props.primaryColor,
    '--soy-primary-color1': props.primaryColor1,
    '--soy-primary-color2': props.primaryColor2,
    '--soy-primary-color-opacity1': props.primaryColorOpacity1,
    '--soy-primary-color-opacity2': props.primaryColorOpacity2,
    '--soy-primary-color-opacity3': props.primaryColorOpacity3,
  }

  return cssVars
}
/**
 * 给颜色加透明度
 * @param color - 颜色
 * @param alpha - 透明度(0 - 1)
 */
export function addColorAlpha(color: string, alpha: number) {
  return colord(color).alpha(alpha).toHex()
}
/**
 * 将带有透明度的颜色转换成相近的没有透明度的颜色
 * @param color - 颜色
 * @param alpha - 透明度(0 - 1)
 * @param bgColor 背景颜色(一般是白色或者黑色)
 */
export function transformColorWithOpacity(color: string, alpha: number, bgColor = '#ffffff') {
  const originColor = addColorAlpha(color, alpha)
  const { r: oR, g: oG, b: oB } = colord(originColor).toRgb()

  const { r: bgR, g: bgG, b: bgB } = colord(bgColor).toRgb()

  function calRgb(or: number, bg: number, al: number) {
    return bg + (or - bg) * al
  }

  const resultRgb: RgbColor = {
    r: calRgb(oR, bgR, alpha),
    g: calRgb(oG, bgG, alpha),
    b: calRgb(oB, bgB, alpha),
  }

  return colord(resultRgb).toHex()
}

export function createTabCssVars(primaryColor: string) {
  const cssProps: CssVarsProps = {
    primaryColor,
    primaryColor1: transformColorWithOpacity(primaryColor, 0.1, '#ffffff'),
    primaryColor2: transformColorWithOpacity(primaryColor, 0.3, '#000000'),
    primaryColorOpacity1: addColorAlpha(primaryColor, 0.1),
    primaryColorOpacity2: addColorAlpha(primaryColor, 0.15),
    primaryColorOpacity3: addColorAlpha(primaryColor, 0.3),
  }

  return createCssVars(cssProps)
}
