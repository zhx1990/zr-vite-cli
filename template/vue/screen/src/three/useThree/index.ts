import * as THREE from 'three'
// @ts-ignore
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { ref, shallowRef } from 'vue'
import { useCamera, camera } from './useCamera'
import { useEffect } from './useEffect'
import { useControl } from './useControl'

export const scene = shallowRef<THREE.Scene>()
export const renderer = shallowRef<THREE.WebGLRenderer>()
export const labelRenderer = shallowRef<CSS2DRenderer>()
export const raycaster = shallowRef<THREE.Raycaster>()
export const updateAnimationFns: Array<(delta: number) => void> = []
export const raycasterActionFns: Array<(objs: THREE.Intersection[]) => void> = []
export const clock = new THREE.Clock()
export const stats = new Stats()
export const isDebugger = true

export function useThree() {
  const threeRef = ref<HTMLElement>()
  /**
   * is debugger mode
   * @return {*}
   */
  function createDebugger() {
    const axesHelper = new THREE.AxesHelper(1000)
    scene.value!.add(axesHelper)
    threeRef.value!.appendChild(stats.dom)
  }
  function createPMREM() {
    const pmremGenerator = new THREE.PMREMGenerator(renderer.value!)
    scene.value!.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
  }

  /**
   * create Scene
   * @return {*}
   */
  function createScene() {
    scene.value = new THREE.Scene()
  }

  /**
   * create Renderer
   * @return {*}
   */
  function createRenderer() {
    const width = threeRef.value!.clientWidth
    const height = threeRef.value!.clientHeight
    renderer.value = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true,
      powerPreference: 'high-performance',
    })
    renderer.value.setSize(width, height)
    renderer.value.shadowMap.enabled = true
    renderer.value.shadowMap.type = THREE.PCFShadowMap
    labelRenderer.value = new CSS2DRenderer()
    labelRenderer.value.setSize(width, height)
    labelRenderer.value.domElement.style.position = 'absolute'
    labelRenderer.value.domElement.style.top = '0px'
    // labelRenderer.value.domElement.style.pointerEvents = 'none'
    threeRef.value!.appendChild(renderer.value.domElement)
    threeRef.value!.appendChild(labelRenderer.value.domElement)
  }

  /**
   * update animation frame
   * @return {*}
   */
  function updateAnimation() {
    const delta = clock.getDelta()
    stats.update()
    requestAnimationFrame(updateAnimation)
    // renderer.value!.render(scene.value!, camera.value!)
    labelRenderer.value!.render(scene.value!, camera.value!)
    updateAnimationFns.forEach((fn) => fn(delta))
  }

  /**
   * create HDR
   * @return {*}
   */
  function createHDR(path: string) {
    const rbgeLoader = new RGBELoader()
    rbgeLoader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping

      scene.value!.background = texture
      scene.value!.environment = texture
      scene.value!.backgroundIntensity = 0.1
      scene.value!.backgroundBlurriness = 0.1
      // renderer.value!.outputColorSpace = THREE.SRGBColorSpace;
    })
  }

  /**
   * 天空盒
   * @return {*}
   * @description:
   */
  function createSkybox() {
    const urls = [
      './textures/skybox/px.jpg',
      './textures/skybox/nx.jpg',
      './textures/skybox/py.jpg',
      './textures/skybox/ny.jpg',
      './textures/skybox/pz.jpg',
      './textures/skybox/nz.jpg',
    ]
    const textureCube = new THREE.CubeTextureLoader().load(urls)
    textureCube.format = THREE.RGBAFormat
    scene.value!.background = textureCube
  }

  /**
   * create raycaster actions
   * @return {*}
   */
  function createRaycaster() {
    raycaster.value = new THREE.Raycaster()
  }

  /**
   *  window resize
   * @return {*}
   */
  function windowResize() {
    window.addEventListener('resize', () => {
      const width = threeRef.value!.clientWidth
      const height = threeRef.value!.clientHeight
      camera.value!.aspect = width / height
      camera.value!.updateProjectionMatrix()
      renderer.value!.setSize(width, height)
    })
  }

  /**
   * setup Three.js
   * @return {*}
   */
  function setupThree() {
    const { createControl } = useControl(threeRef)
    const { createEffects } = useEffect()
    const { createCamera } = useCamera()
    createScene()
    createCamera(threeRef)
    createRenderer()
    createRaycaster()
    createControl()
    createEffects()
    updateAnimation()
    createPMREM()
    // createSkybox()
    // windowResize()

    const geo = new THREE.BoxGeometry(1, 1, 1)
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geo, mat)
    scene.value!.add(mesh)

    if (isDebugger) {
      // @ts-ignore
      window.zhx = {
        camera,
        scene,
      }
      createDebugger()
    }
  }

  return {
    threeRef,
    setupThree,
  }
}
