import * as THREE from 'three'
import { scene } from '@/three/useThree'

export function useLight() {
  const createAmbientLight = () => {
    const ambLight = new THREE.AmbientLight(0x0c0c0c)
    scene.value!.add(ambLight)
  }

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

  const initLight = () => {
    createAmbientLight()
    createSpotLight()
  }

  return {
    initLight,
  }
}
