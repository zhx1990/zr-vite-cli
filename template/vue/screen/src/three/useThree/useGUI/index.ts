import gsap from 'gsap'
import { Pane } from 'tweakpane'
import { BlendFunction } from 'postprocessing'
import { useEffect } from '../useEffect'
import scanParams from '../useMaterial/ScanParticleMaterial/Params'
import { useEmitter } from '../useEmitter'

let gui = {} as Pane
export function useGUI() {
  gui = new Pane()
  const { effectPass, bloomEffect } = useEffect()
  const { emitter } = useEmitter()
  /**
   * 辉光
   * @return {*}
   * @description:
   */
  const bloomEffectOption = () => {
    if (!bloomEffect.value || !effectPass.value) return

    const params = {
      intensity: bloomEffect.value.intensity,
      radius: (bloomEffect.value as any).mipmapBlurPass.radius,
      luminance: {
        filter: bloomEffect.value.luminancePass.enabled,
        threshold: bloomEffect.value.luminanceMaterial.threshold,
        smoothing: bloomEffect.value.luminanceMaterial.smoothing,
      },
      selection: {
        inverted: bloomEffect.value.inverted,
        'ignore bg': bloomEffect.value.ignoreBackground,
      },
      opacity: bloomEffect.value.blendMode.opacity.value,
      'blend mode': bloomEffect.value.blendMode.blendFunction,
    }

    const folder = gui.addFolder({
      title: '辉光',
      expanded: true,
    })
    folder
      .addBinding(params, 'intensity', {
        min: 0,
        max: 10,
      })
      .on('change', (ev) => {
        bloomEffect.value!.intensity = ev.value
      })

    folder
      .addBinding(params, 'radius', {
        min: 0,
        max: 10,
      })
      .on('change', (ev) => {
        ;(bloomEffect.value! as any).mipmapBlurPass.radius = ev.value
      })

    folder
      .addBinding(params, 'opacity', {
        min: 0,
        max: 1,
      })
      .on('change', (ev) => {
        bloomEffect.value!.blendMode.opacity.value = ev.value
      })

    const opt = Object.keys(BlendFunction).map((key) => ({
      text: key,
      value: (BlendFunction as any)[key],
    }))
    folder
      .addBinding(params, 'blend mode', {
        view: 'list',
        // label: 'blend mode',
        options: opt,
        value: 0,
      })
      .on('change', (ev) => {
        bloomEffect.value!.blendMode.setBlendFunction(ev.value)
      })

    folder.addBinding(effectPass.value, 'dithering').on('change', (ev) => {
      effectPass.value!.dithering = ev.value
    })

    const luminance = folder.addFolder({
      title: '辉光亮度',
      expanded: false,
    })
    luminance.addBinding(params.luminance, 'filter').on('change', (ev) => {
      console.log(bloomEffect.value)
      bloomEffect.value!.luminancePass.enabled = ev.value
    })

    luminance
      .addBinding(params.luminance, 'threshold', {
        min: 0,
        max: 1,
      })
      .on('change', (ev) => {
        bloomEffect.value!.luminanceMaterial.threshold = Number(ev.value)
      })

    luminance
      .addBinding(params.luminance, 'smoothing', {
        min: 0,
        max: 1,
      })
      .on('change', (ev) => {
        bloomEffect.value!.luminanceMaterial.smoothing = Number(ev.value)
      })

    const selection = folder.addFolder({
      title: '选择区域',
      expanded: false,
    })

    selection.addBinding(params.selection, 'inverted').on('change', (ev) => {
      bloomEffect.value!.inverted = ev.value
    })

    selection.addBinding(params.selection, 'ignore bg').on('change', (ev) => {
      bloomEffect.value!.ignoreBackground = ev.value
    })
  }

  const scanMaterialOption = () => {
    const params = gui.addFolder({
      title: '扫描材质',
    })

    params.addBinding(scanParams.progress, 'value', {
      label: 'Progress',
      min: 0,
      max: 1,
      step: 0.00001,
    })

    params.addBinding(scanParams.vanishDirection, 'value', {
      label: 'Vanish Direction',
      picker: 'inline',
      expanded: true,
      step: 0.00001,
      x: { min: -1, max: 1 },
      y: { min: -1, max: 1 },
      z: { min: -1, max: 1 },
    })

    params.addBinding(scanParams.baseNoiseIteration, 'value', {
      label: 'Noise Max iteration',
      min: 1,
      max: 5,
      step: 1,
    })

    params.addBinding(scanParams.noiseDiffusion, 'value', {
      label: 'Noise diffusion',
      min: 0,
      max: 1,
    })

    params.addBinding(scanParams.noisePrecision, 'value', {
      label: 'Noise precision',
      min: 0,
      max: 4,
    })

    params.addBinding(scanParams.lightningThickness, 'value', {
      label: 'Light Thickness',
      min: 0,
      max: 1,
    })

    params.addBinding(scanParams.lightningPower, 'value', {
      label: 'Light Intensity',
      min: 0,
      max: 0.3,
    })
    params.addBinding(scanParams.lightningDiffusion, 'value', {
      label: 'Light Diffusion',
      min: 0,
      max: 0.03,
    })

    params
      .addBinding(scanParams, 'mainColor', {
        label: 'Color',
        view: 'color',
      })
      .on('change', ({ value }) => {
        // ev('colorUpdate', { color: value })
        emitter.emit('colorUpdate', { color: value })
      })

    params.addBinding(scanParams, 'useBloom')

    params.addBinding(scanParams.particleDiffusion, 'value', {
      label: 'Particule Diffusion',
      min: 0,
      max: 0.3,
    })

    gui
      .addButton({
        title: 'Vanish',
      })
      .on('click', () => {
        gsap.fromTo(
          scanParams.progress,
          {
            value: 0,
          },
          {
            value: 1,
            duration: 5,
            ease: 'slow(.4, .8, false)',
            onStart: () => gui.refresh(),
            onUpdate: () => gui.refresh(),
          }
        )
      })

    gui
      .addButton({
        title: 'Materialize',
      })
      .on('click', () => {
        gsap.to(scanParams.progress, {
          value: 0,
          duration: 2.4,
          overwrite: true,
          ease: 'power3.inOut',
          onStart: () => gui.refresh(),
          onUpdate: () => gui.refresh(),
        })
      })
  }

  return {
    bloomEffectOption,
    scanMaterialOption,
  }
}
