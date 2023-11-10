import * as THREE from 'three'
import { ScanLineMaterial } from './ScanLineMaterial'
import { ScanLineLightMaterial } from './ScanLineLightMaterial'

export function useMaterial() {
  /**
   * 扫描线材质
   * @param {THREE.ShaderMaterialParameters} options
   * @return {*}
   * @description:
   */
  const scanLineMaterial = (options?: THREE.ShaderMaterialParameters) =>
    new ScanLineMaterial(options)

  /**
   * 扫描线发光材质
   * @param {THREE.ShaderMaterialParameters} options
   * @return {*}
   * @description:
   */
  const scanLineLightMaterial = (options?: THREE.ShaderMaterialParameters) =>
    new ScanLineLightMaterial(options)

  return {
    scanLineMaterial,
    scanLineLightMaterial,
  }
}
