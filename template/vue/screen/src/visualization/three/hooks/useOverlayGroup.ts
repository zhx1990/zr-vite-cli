import * as THREE from 'three'
import { vNodeToDom } from '@/utils'
// @ts-ignore
import { CSS3DObject, CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js'
import { type ShallowRef, onMounted, shallowRef } from 'vue'
import { ModelPoint, SiteMark } from '../BaseThree/components'

export function useOverlayGroup(options: { scene: ShallowRef<THREE.Scene | undefined> }) {
  const pointGroup = new THREE.Group()
  const siteMarkGroup = new THREE.Group()
  const siteMarkTipGroup = new THREE.Group()
  const defaultScale = 0.3
  const createModelPointOverlay = () => {
    const el = vNodeToDom({
      component: ModelPoint,
      componentProps: {
        name: '测点',
      },
    })
    const mesh = new CSS3DSprite(el)
    mesh.position.set(0, 100, 100)
    mesh.scale.set(defaultScale, defaultScale, defaultScale)
    pointGroup.add(mesh)
  }

  const createSiteMark = () => {
    const el = vNodeToDom({
      component: SiteMark,
      componentProps: {
        id: '123123',
        bdName: '站点',
        lng: 119.6239,
        lat: 26.4532,
        legendType: 2,
        bdCode: '123',
      },
    })
    const mesh = new CSS3DSprite(el)
    mesh.position.set(100, 100, 100)
    mesh.scale.set(defaultScale, defaultScale, defaultScale)
    siteMarkGroup.add(mesh)
  }

  const setupOverlayAndLayer = () => {
    options.scene.value?.add(pointGroup, siteMarkGroup, siteMarkTipGroup)
    createSiteMark()
  }

  return {
    pointGroup,
    createModelPointOverlay,
    setupOverlayAndLayer,
  }
}
