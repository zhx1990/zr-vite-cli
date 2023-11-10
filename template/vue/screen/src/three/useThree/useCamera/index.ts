import { type Ref, shallowRef } from 'vue'
import * as THREE from 'three'

export const camera = shallowRef<THREE.PerspectiveCamera>()

export function useCamera() {
  /**
   * create Camera
   * @return {*}
   */
  function createCamera(threeRef: Ref<HTMLElement | undefined>) {
    if (threeRef.value === undefined) return
    const fov = 75
    const aspect = threeRef.value.clientWidth / threeRef.value.clientHeight
    const near = 0.1
    const far = 1000
    camera.value = new THREE.PerspectiveCamera(fov, aspect, near, far)

    camera.value.position.set(0, 10, 10)
    camera.value.lookAt(0, 0, 0)
  }

  /**
   * 相机移动到指定位置
   * @param {THREE} position
   * @param {number} duration
   * @return {*}
   * @description:
   */
  const cameraTo = (position: THREE.Vector3, duration: number = 1) => {
    gsap.to(camera.value!.position, {
      duration,
      x: position.x,
      y: position.y,
      z: position.z,
      ease: 'linear',
    })
  }

  return {
    createCamera,
    cameraTo,
  }
}
