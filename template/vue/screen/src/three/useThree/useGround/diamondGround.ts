import * as THREE from 'three'
import type { ColorRepresentation } from 'three'

export function diamondGround() {
  const textureLoader = new THREE.TextureLoader()
  /**
   * create 菱形地面
   * @param {number} rangeSize 地面网格尺寸
   * @param {number} divisions 地面网格细分数
   * @param {ColorRepresentation} color 网格线颜色
   * @param {number} radiusSize 圆点半径  加号宽高尺寸
   * @param {ColorRepresentation} radiusColor 原点颜色
   * @return {*}
   * @description:
   */
  const createDiamondGround = (
    rangeSize: number,
    divisions: number,
    color: ColorRepresentation,
    radiusSize: number,
    radiusColor: ColorRepresentation
  ) => {
    const group = new THREE.Group()
    const gridHelper = new THREE.GridHelper(rangeSize, divisions, color, color)
    group.add(gridHelper)
    gridHelper.renderOrder = -2
    const h = radiusSize / 2
    const vertices = new Float32Array([-h, 0, 0, 0, 0, -h, h, 0, 0, 0, 0, h])
    const geometry = new THREE.BufferGeometry()
    geometry.attributes.position = new THREE.BufferAttribute(vertices, 3)
    const indexs = new Uint16Array([0, 1, 2, 0, 2, 3])
    geometry.index = new THREE.BufferAttribute(indexs, 1)
    const material = new THREE.MeshBasicMaterial({
      color: radiusColor,
      side: THREE.DoubleSide,
      // depthWrite: false,
    })
    const sp = rangeSize / divisions
    const x = rangeSize / 2
    for (let i = 0; i < divisions; i += 1) {
      for (let j = 0; j < divisions; j += 1) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.renderOrder = -1
        mesh.translateX(-x + i * sp)
        mesh.translateZ(-x + j * sp)
        group.add(mesh)
      }
    }
    return group
  }
  const createPointGround = (rangeSize: number) => {
    const textureC1 = textureLoader.load('./textures/circle/c3.png')
    // texture重复铺满
    textureC1.wrapS = THREE.RepeatWrapping
    textureC1.wrapT = THREE.RepeatWrapping
    textureC1.repeat.set(10, 10)

    const circleGeometry = new THREE.CircleGeometry(rangeSize)
    const circleMaterial = new THREE.MeshBasicMaterial({
      map: textureC1,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    })
    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    circle.rotation.x = -Math.PI / 2
    return circle
  }

  return {
    createDiamondGround,
    createPointGround,
  }
}
