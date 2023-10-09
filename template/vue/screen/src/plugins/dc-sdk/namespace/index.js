/**
 * @Author : Caven Chen
 */
import * as c from '@cesium/engine'
import * as t from '@turf/turf'
import * as e from 'echarts'
import s from 'supercluster'

import { getLib } from '../global-api/lib-utils.js'

// export const Cesium = getLib('Cesium')
export const Cesium = c

// export const turf = getLib('turf')
export const turf = t

// export const echarts = getLib('echarts')
export const echarts = e

// export const Supercluster = getLib('Supercluster')
export const Supercluster = s
