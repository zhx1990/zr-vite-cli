import * as THREE from 'three'
import { renderer } from '@/three/useThree'
import fragment from './fragment.glsl'
import vertex from './vertex.glsl'

export class ScanLineLightMaterial extends THREE.ShaderMaterial {
  constructor(options?: THREE.ShaderMaterialParameters) {
    const windowSize = new THREE.Vector2()
    renderer.value?.getDrawingBufferSize(windowSize)
    super({
      vertexShader: vertex,
      fragmentShader: fragment,
      //   uniforms: {
      //     iTime: { value: 0 },
      //     iResolution: { value: new THREE.Vector2(windowSize.width, windowSize.height) },
      //     iChannel0: { value: texture },
      //   },
      ...options,
    })
  }
}
