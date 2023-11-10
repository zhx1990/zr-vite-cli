import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
dracoLoader.setDecoderConfig({ type: 'js' })
export function useModel() {
  /**
   * glft load
   * @param {string} path
   * @param {*} isDraco
   * @return {*}
   */
  function gltfLoad(path: string, isDraco?: boolean, loadedCallback?: (progress: string) => void) {
    return new Promise<GLTF>((resolve, reject) => {
      const loader: GLTFLoader = new GLTFLoader()
      if (isDraco) {
        loader.setDRACOLoader(dracoLoader)
      }
      loader.load(
        path,
        (gltf) => {
          resolve(gltf)
        },
        (xhr) => {
          const progress = (xhr.loaded / xhr.total) * 100
          loadedCallback && loadedCallback(progress.toFixed(0))
        },
        (err) => {
          reject(err)
        }
      )
    })
  }
  return {
    gltfLoad,
  }
}
