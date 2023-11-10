import { shallowRef } from 'vue'
import {
  EffectPass,
  SMAAEffect,
  PredicationMode,
  EffectComposer,
  RenderPass,
  SelectiveBloomEffect,
  BlendFunction,
} from 'postprocessing'
import { camera } from '../useCamera'
import { scene, renderer, updateAnimationFns, labelRenderer } from '../index'

const composer = shallowRef<EffectComposer>()
const effectPass = shallowRef<EffectPass>()
const bloomEffect = shallowRef<SelectiveBloomEffect>()
const smaaEffect = shallowRef<SMAAEffect>()
export function useEffect() {
  /**
   * create 抗锯齿
   * @return {*}
   */
  const _initSMAAEffect = () => {
    smaaEffect.value = new SMAAEffect()
    smaaEffect.value.edgeDetectionMaterial.edgeDetectionThreshold = 0.02
    smaaEffect.value.edgeDetectionMaterial.predicationMode = PredicationMode.DEPTH
    smaaEffect.value.edgeDetectionMaterial.predicationThreshold = 0.002
    smaaEffect.value.edgeDetectionMaterial.predicationScale = 1.0
  }

  /**
   * init 辉光
   * @return {*}
   * @description:
   */
  const _initBloomEffect = () => {
    bloomEffect.value = new SelectiveBloomEffect(scene.value, camera.value, {
      blendFunction: BlendFunction.ADD,
      mipmapBlur: true,
      luminanceThreshold: 0,
      luminanceSmoothing: 0,
      //   radius: 0,
      intensity: 0.1,
    })
    bloomEffect.value.inverted = true
  }
  /**
   * create effects
   * @return {*}
   */
  const createEffects = () => {
    composer.value = new EffectComposer(renderer.value)
    composer.value.addPass(new RenderPass(scene.value, camera.value))
    _initSMAAEffect()
    _initBloomEffect()
    effectPass.value = new EffectPass(camera.value, smaaEffect.value!, bloomEffect.value!)
    composer.value.addPass(effectPass.value)

    updateAnimationFns.push((delta: number) => {
      composer.value!.render(delta)
    })
  }

  return {
    composer,
    effectPass,
    bloomEffect,
    smaaEffect,
    createEffects,
  }
}
