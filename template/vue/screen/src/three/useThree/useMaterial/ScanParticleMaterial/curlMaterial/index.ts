import { Clock, DoubleSide, RawShaderMaterial } from 'three'
import { updateAnimationFns } from '@/three/useThree'
import { useEmitter } from '../../../useEmitter'
import vertexShader from './vertex.vs.glsl'
import fragmentShader from './fragment.fs.glsl'

export default class LokiMaterial extends RawShaderMaterial {
  constructor(uniforms = {}) {
    super({
      vertexShader,
      fragmentShader,
      depthTest: false,

      transparent: true,
      side: DoubleSide,
    })

    this.uniforms = uniforms

    updateAnimationFns.push((delta) => this.onUpdateTime(delta))
    this.bindEvents()
  }

  bindEvents() {
    const { emitter } = useEmitter()
    emitter.on('colorUpdate', (e: any) => {
      this.onUpdateColor(e)
    })
    // emitter.on('scene:update', () => this.onUpdateTime())
  }

  onUpdateColor({ color }) {
    this.uniforms.color.value.set(color)

    this.uniformsNeedUpdate = true
  }

  onUpdateTime(delta: number) {
    this.uniforms.time.value += delta
  }
}
