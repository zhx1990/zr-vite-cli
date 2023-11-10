import * as THREE from 'three'
import { type InjectionKey, onUnmounted, ref, shallowRef } from 'vue'
// @ts-ignore
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'
// @ts-ignore
import { TransformControls } from 'three/addons/controls/TransformControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type {
  EffectPass,
  SMAAEffect,
  EffectComposer,
  SelectiveBloomEffect,
  SSAOEffect,
  OutlineEffect,
} from 'postprocessing'
import {
  useEffect,
  useCamera,
  usePosition,
  useModel,
  useGUI,
  useReflector,
  circleAnimation,
} from '@/hooks/useThree'
import { useOverlayGroup } from './useOverlayGroup'

export function useThree() {
  const threeRef = ref<HTMLElement>()
  const clock = new THREE.Clock()
  const stats = new Stats()
  const isDebugger = false
  const camera = shallowRef<THREE.PerspectiveCamera>()
  const scene = shallowRef<THREE.Scene>()
  const renderer = shallowRef<THREE.WebGLRenderer>()
  const labelRenderer = shallowRef<CSS3DRenderer>()
  const orbitControls = shallowRef<OrbitControls>()
  const raycaster = shallowRef<THREE.Raycaster>()
  const updateAnimationFns: Array<(delta: number) => void> = []
  const transformControls = shallowRef<TransformControls>()
  // effect
  const smaaEffect = shallowRef<SMAAEffect>()
  const ssaoEffect = shallowRef<SSAOEffect>()
  const outlineEffect = shallowRef<OutlineEffect>()
  const bloomEffect = shallowRef<SelectiveBloomEffect>()
  const effectPass = shallowRef<EffectPass>()
  const composer = shallowRef<EffectComposer>()

  const { createCamera, cameraTo } = useCamera()
  const { createEffects } = useEffect(camera)
  const { gltfLoad } = useModel()
  const { createReflector } = useReflector()
  const { setupOverlayAndLayer, createModelPointOverlay } = useOverlayGroup({
    scene,
  })
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
      const { bloomEffectOption, outlineEffectOption } = useGUI(
        renderer,
        effectPass,
        bloomEffect,
        outlineEffect
      )
      bloomEffectOption()
      outlineEffectOption()
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
    orbitControls.value.minDistance = 1
    orbitControls.value.maxDistance = 3000
    // 禁止鼠标右键拖拽
    orbitControls.value.enablePan = false

    updateAnimationFns.push(() => {
      if (orbitControls.value) orbitControls.value.update()
    })
  }

  /**
   * 创建环境光
   * @description:
   * @return {*}
   */
  const createAmbientLight = () => {
    const ambLight = new THREE.AmbientLight(0x0c0c0c)
    scene.value!.add(ambLight)
  }

  /**
   * 创建聚光灯
   * @description:
   * @return {*}
   */
  const createSpotLight = () => {
    // const sun = new THREE.SpotLight(0xffffff)
    // sun.position.set(-200, 200, -100)
    // sun.castShadow = true
    // sun.shadow.mapSize.width = 2048
    // sun.shadow.mapSize.height = 2048
    // sun.shadow.bias = -0.00001
    // sun.angle = 0.1
    // sun.intensity = 5
    // scene.value!.add(sun)
    // const pointLight = new THREE.PointLight(0xffffff, 1)
    // scene.value!.add(pointLight)
    // pointLight.position.set(0, 50, 0)
    // pointLight.castShadow = true
    // const lightHelper = new THREE.PointLightHelper(pointLight, 10, 0xffff00)
    // scene.value!.add(lightHelper)
    // lightHelper.update()
    const spotLight1 = new THREE.SpotLight(0xffffff)
    spotLight1.position.set(-400, -400, -400)

    const spotLight2 = new THREE.SpotLight(0xffffff)
    spotLight2.position.set(400, 400, 400)

    scene.value!.add(spotLight1)
    scene.value!.add(spotLight2)
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

      scene.value!.background = texture
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

  const cameraRotate = () => {
    if (orbitControls.value?.autoRotate) {
      orbitControls.value.autoRotate = false
      return
    }
    cameraTo(camera, new THREE.Vector3(0, 400, 300), 1)
    orbitControls.value!.autoRotate = true
  }

  /**
   * 创建地面圆环动画
   * @description:
   * @return {*}
   */
  const createCircleAnimation = () => {
    const { createCircle } = circleAnimation()
    const circle = createCircle({
      texturePath: [
        './textures/circle/c1.png',
        './textures/circle/c2.png',
        './textures/circle/c3.png',
      ],
      position: [
        new THREE.Vector3(0, 0.1, 0),
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(0, 0.3, 0),
      ],
      scale: [25, 23, 23],
      duration: [50, 100],
    })
    scene.value!.add(circle)
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
    const model = await gltfLoad('/models/dam1.glb')
    const dam = model.scene
    const scale = 10
    dam.scale.set(scale, scale, scale)
    scene.value?.add(dam)
  }

  const test = () => {
    const geo = new THREE.BoxGeometry(1, 1, 1)
    const mat = new THREE.MeshBasicMaterial({
      color: '#ff00ff',
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(0, 2, 0)
    outlineSelection.push(mesh)
    outlineEffect.value!.selection.set(outlineSelection)
    scene.value?.add(mesh)
  }

  /**
   * setup Three.js
   * @return {*}
   */
  const setupThree = () => {
    camera.value = createCamera(threeRef, new THREE.Vector3(0, 230, 230))
    createScene()
    createRenderer()
    createAmbientLight()
    createSpotLight()
    createRaycaster()
    createHDR('/hdr/hdr2.hdr')
    createTransformControls()
    // createPMREM()
    createSkybox()
    createGround()
    createCircleAnimation()
    bindEvent()
    updateAnimation()
    windowResize()
    loadDamModel()
    setupOverlayAndLayer()
    createModelPointOverlay()
    createControl()
    const ef = createEffects(scene, renderer, updateAnimationFns)
    smaaEffect.value = ef.smaaEffect
    bloomEffect.value = ef.bloomEffect
    outlineEffect.value = ef.outlineEffect
    ssaoEffect.value = ef.ssaoEffect
    effectPass.value = ef.effectPass
    composer.value = ef.composer
    createDebugger()
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
    unbindEvent()
  }

  const THREE_PROVIDE_KEY: InjectionKey<{
    threeRef: typeof threeRef
    cameraRotate: typeof cameraRotate
  }> = 'BASE_THREE' as any

  return {
    threeRef,
    THREE_PROVIDE_KEY,
    setupThree,
    destroy,
    cameraRotate,
  }
}
