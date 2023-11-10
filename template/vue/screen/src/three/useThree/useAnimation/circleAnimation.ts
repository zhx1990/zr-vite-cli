import * as THREE from 'three'
import gsap from 'gsap'

export function circleAnimation() {
  const textureLoader = new THREE.TextureLoader()

  const _createCircleGeometry = (texturePath: string, y: number = 1, scale: number = 1) => {
    const textureC1 = textureLoader.load(texturePath)
    const circleGeometry = new THREE.CircleGeometry(45)
    const circleMaterial = new THREE.MeshBasicMaterial({
      map: textureC1,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    })
    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    circle.position.set(-4, y, 6)
    circle.rotation.x = -Math.PI / 2
    circle.scale.set(scale, scale, scale)
    return circle
  }

  const _createGsap = (mesh: THREE.Mesh, value: number) => {
    gsap.to(mesh.rotation, {
      duration: 10,
      z: value,
      repeat: -1,
      ease: 'none',
    })
  }
  const createCircle = () => {
    const group = new THREE.Group()
    const c1 = _createCircleGeometry('./textures/circle/c1.png', 0.2)
    const c2 = _createCircleGeometry('./textures/circle/c2.png', 0.3, 0.8)
    const c3 = _createCircleGeometry('./textures/circle/c3.png', 0.4)
    group.add(c1, c2, c3)
    group.name = 'circleAnimation'
    _createGsap(c1, Math.PI * 2)
    _createGsap(c2, -Math.PI * 2)
    return group
  }

  return {
    createCircle,
  }
}
