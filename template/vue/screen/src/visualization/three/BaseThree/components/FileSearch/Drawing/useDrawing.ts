import * as THREE from 'three'
// @ts-ignore
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'
// @ts-ignore
import { TransformControls } from 'three/addons/controls/TransformControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { onUnmounted, ref, shallowRef } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type {
  EffectPass,
  SMAAEffect,
  EffectComposer,
  SelectiveBloomEffect,
  SSAOEffect,
  OutlineEffect,
} from 'postprocessing'
import { useEffect, useCamera, usePosition, useModel, useGUI, useReflector } from '@/hooks/useThree'

export const camera = shallowRef<THREE.PerspectiveCamera>()
export const scene = shallowRef<THREE.Scene>()
export const renderer = shallowRef<THREE.WebGLRenderer>()
export const labelRenderer = shallowRef<CSS3DRenderer>()
export const orbitControls = shallowRef<OrbitControls>()
export const raycaster = shallowRef<THREE.Raycaster>()
export const updateAnimationFns: Array<(delta: number) => void> = []
export const transformControls = shallowRef<TransformControls>()
// effect
export const smaaEffect = shallowRef<SMAAEffect>()
export const ssaoEffect = shallowRef<SSAOEffect>()
export const outlineEffect = shallowRef<OutlineEffect>()
export const bloomEffect = shallowRef<SelectiveBloomEffect>()
export const effectPass = shallowRef<EffectPass>()
export const composer = shallowRef<EffectComposer>()

export function useDrawing() {
  const threeRef = ref<HTMLElement>()
  const clock = new THREE.Clock()
  const stats = new Stats()
  const isDebugger = false

  const { createCamera } = useCamera()
  const { createEffects } = useEffect(camera)
  const { gltfLoad } = useModel()
  // const { bloomEffectOption, outlineEffectOption } = useGUI(
  //   renderer,
  //   effectPass,
  //   bloomEffect,
  //   outlineEffect
  // )
  const { createReflector } = useReflector()
  const { lngLatToXYZ, flyToPosition } = usePosition(camera)

  // 轮廓选择
  const outlineSelection: THREE.Object3D[] = []

  /**
   * is debugger mode
   * @return {*}
   */
  const createDebugger = () => {
    if (isDebugger) {
      // @ts-ignore
      window.zhx = {
        camera,
        scene,
      }
      const axesHelper = new THREE.AxesHelper(1000)
      scene.value!.add(axesHelper)
      threeRef.value!.appendChild(stats.dom)
    }
  }

  const createPMREM = () => {
    const pmremGenerator = new THREE.PMREMGenerator(renderer.value!)
    scene.value!.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
  }

  /**
   * create Scene
   * @return {*}
   */
  const createScene = () => {
    scene.value = new THREE.Scene()
  }

  /**
   * create Renderer
   * @return {*}
   */
  const createRenderer = () => {
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
    labelRenderer.value = new CSS3DRenderer()
    labelRenderer.value.setSize(width, height)
    labelRenderer.value.domElement.style.position = 'absolute'
    labelRenderer.value.domElement.style.top = '0px'
    // labelRenderer.value.domElement.style.pointerEvents = 'none'
    threeRef.value!.appendChild(renderer.value.domElement)
    threeRef.value!.appendChild(labelRenderer.value.domElement)
  }

  /**
   * createControl
   * @description:
   * @return {*}
   */
  const createControl = () => {
    orbitControls.value = new OrbitControls(camera.value!, labelRenderer.value!.domElement)
    orbitControls.value.minPolarAngle = 0
    orbitControls.value.maxPolarAngle = Math.PI / 2.2
    orbitControls.value.enableRotate = false
    orbitControls.value.minAzimuthAngle = -Math.PI / 4
    orbitControls.value.maxAzimuthAngle = Math.PI / 4
    orbitControls.value.minDistance = 1
    orbitControls.value.maxDistance = 55
    orbitControls.value.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
    }

    updateAnimationFns.push(() => {
      if (orbitControls.value) orbitControls.value.update()
    })
  }

  /**
   * update animation frame
   * @return {*}
   */
  const updateAnimation = () => {
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
  const createHDR = (path: string) => {
    const rbgeLoader = new RGBELoader()
    rbgeLoader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping

      // scene.value!.background = texture
      scene.value!.environment = texture
      scene.value!.backgroundIntensity = 0.1
      scene.value!.backgroundBlurriness = 0.1
      // renderer.value!.outputColorSpace = THREE.SRGBColorSpace
    })
  }

  /**
   * 天空盒
   * @return {*}
   * @description:
   */
  const createSkybox = () => {
    const urls = [
      '/textures/skybox/px.jpg',
      '/textures/skybox/nx.jpg',
      '/textures/skybox/py.jpg',
      '/textures/skybox/ny.jpg',
      '/textures/skybox/pz.jpg',
      '/textures/skybox/nz.jpg',
    ]
    const textureCube = new THREE.CubeTextureLoader().load(urls)
    textureCube.format = THREE.RGBAFormat
    scene.value!.background = textureCube
  }

  /**
   * create raycaster actions
   * @return {*}
   */
  const createRaycaster = () => {
    raycaster.value = new THREE.Raycaster()
  }

  /**
   * 创建镜面反射地面
   * @description:
   * @return {*}
   */
  const createGround = () => {
    const groundMirror = createReflector(new THREE.CircleGeometry(1000))
    groundMirror.receiveShadow = true
    groundMirror.castShadow = true
    groundMirror.rotateX(-Math.PI / 2)
    groundMirror.position.set(-4, -0.1, 6)
    scene.value?.add(groundMirror)
  }

  /**
   * 获取射线相交
   * @description:
   * @param {MouseEvent} event
   * @return {*}
   */
  const getRaycasterIntersects = (event: MouseEvent) => {
    const mouse = new THREE.Vector2()
    const rect = threeRef.value!.getBoundingClientRect()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    raycaster!.value!.setFromCamera(mouse, camera.value!)
    const intersects = raycaster!.value!.intersectObjects(scene.value!.children)
    return intersects
  }

  /**
   * 鼠标左键操作集
   * @description:
   * @param {MouseEvent} event
   * @return {*}
   */
  const leftClick = (event: MouseEvent) => {
    const intersects = getRaycasterIntersects(event)

    if (intersects.length > 0) {
      // outlineSelection = []
      // console.log(intersects[0].object)
      outlineSelection.push(intersects[0].object)
      outlineEffect.value!.selection.set([intersects[0].object])
    }
  }

  /**
   * 创建转换编辑控制器
   * @description:
   * @return {*}
   */
  const createTransformControls = () => {
    transformControls.value = new TransformControls(camera.value, labelRenderer.value!.domElement)
    // control.attach(mesh)
    scene.value!.add(transformControls.value)
    transformControls.value.addEventListener('dragging-changed', (event) => {
      orbitControls.value!.enabled = !event.value
    })
  }

  /**
   * 绑定事件
   * @description:
   * @return {*}
   */
  const bindEvent = () => {
    labelRenderer.value!.domElement.addEventListener('click', leftClick, false)
  }

  /**
   * unbind event
   * @description:
   * @return {*}
   */
  const unbindEvent = () => {
    labelRenderer.value!.domElement.removeEventListener('click', leftClick, false)
  }

  /**
   *  window resize
   * @return {*}
   */
  const windowResize = () => {
    window.addEventListener('resize', () => {
      const width = threeRef.value!.clientWidth
      const height = threeRef.value!.clientHeight
      camera.value!.aspect = width / height
      camera.value!.updateProjectionMatrix()
      renderer.value!.setSize(width, height)
    })
  }

  const loadDamModel = async () => {
    const model = await gltfLoad('/models/dam.glb')
    const dam = model.scene
    scene.value?.add(dam)
  }

  const loadImage = () => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load('/test.jpg')
    const geometry = new THREE.PlaneGeometry(120, 80)
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(geometry, material)
    plane.rotateX(-Math.PI / 2)
    scene.value?.add(plane)
  }

  /**
   * setup Three.js
   * @return {*}
   */
  const setupThree = () => {
    camera.value = createCamera(threeRef, new THREE.Vector3(0, 150, 0))
    createScene()
    createRenderer()
    createRaycaster()
    createHDR('/hdr/hdr.hdr')
    createTransformControls()
    createPMREM()
    createSkybox()
    // createGround()
    // bindEvent()
    windowResize()
    createControl()
    updateAnimation()
    const ef = createEffects(scene, renderer, updateAnimationFns)
    smaaEffect.value = ef.smaaEffect
    bloomEffect.value = ef.bloomEffect
    outlineEffect.value = ef.outlineEffect
    ssaoEffect.value = ef.ssaoEffect
    effectPass.value = ef.effectPass
    composer.value = ef.composer
    // loadDamModel()
    // createDebugger()
    loadImage()
  }
  /* 销毁 */
  const destroy = () => {
    camera.value = undefined
    scene.value = undefined
    renderer.value = undefined
    labelRenderer.value = undefined
    orbitControls.value = undefined
    raycaster.value = undefined
    updateAnimationFns.length = 0
    transformControls.value = undefined
    smaaEffect.value = undefined
    ssaoEffect.value = undefined
    outlineEffect.value = undefined
    bloomEffect.value = undefined
    effectPass.value = undefined
    composer.value = undefined
    // unbindEvent()
  }

  return {
    threeRef,
    setupThree,
    destroy,
  }
}
