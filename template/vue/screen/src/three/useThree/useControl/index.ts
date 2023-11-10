import * as THREE from 'three'
import { type Ref, shallowReactive, shallowRef } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { labelRenderer, updateAnimationFns, raycaster, scene } from '../index'
import { camera } from '../useCamera'

export function useControl(threeRef: Ref<HTMLElement | undefined>) {
  const orbitControls = shallowRef<OrbitControls>()
  const state = shallowReactive({
    windowPosition: new THREE.Vector3(),
  })

  /**
   * init orbitControls
   * @return {*}
   */
  const _initOrbitControls = () => {
    orbitControls.value = new OrbitControls(camera.value!, labelRenderer.value!.domElement)
    orbitControls.value!.minPolarAngle = 0
    orbitControls.value!.maxPolarAngle = Math.PI / 2.2
    orbitControls.value!.minDistance = 1
    orbitControls.value!.maxDistance = 80
    // 禁止鼠标右键拖拽
    orbitControls.value!.enablePan = false

    updateAnimationFns.push(() => {
      orbitControls.value!.update()
    })
  }

  const _onClick = (event: MouseEvent) => {
    if (threeRef.value === undefined) return
    const mouse = new THREE.Vector2()
    const rect = threeRef.value.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    raycaster!.value!.setFromCamera(mouse, camera.value!)
    const intersects = raycaster!.value!.intersectObjects(scene.value!.children)
    console.log('intersects :>> ', intersects)
  }

  const createControl = () => {
    _initOrbitControls()
    labelRenderer.value!.domElement.addEventListener('click', _onClick, false)
  }

  return {
    state,
    createControl,
  }
}
