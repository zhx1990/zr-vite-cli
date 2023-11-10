import * as THREE from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'

export function useReflector() {
  /**
   * create 镜面反射
   * @return {*}
   * @description:
   */
  const createReflector = (geometry: THREE.BufferGeometry) => {
    const groundGeometry = geometry
    const groundMirror = new Reflector(groundGeometry, {
      clipBias: 0.003,
      textureWidth: 512,
      textureHeight: 512,
      color: 0x777777,
      shader: {
        uniforms: {
          color: {
            value: null,
          },
          tDiffuse: {
            value: null,
          },
          textureMatrix: {
            value: null,
          },
        },
        vertexShader: /* glsl */ `
                uniform mat4 textureMatrix;
                varying vec4 vUv;
                #include <common>
                #include <logdepthbuf_pars_vertex>
                void main() {
                  vUv = textureMatrix * vec4( position, 1.0 );
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                  #include <logdepthbuf_vertex>
                }`,
        fragmentShader: /* glsl */ `
                uniform vec3 color;
                uniform sampler2D tDiffuse;
                varying vec4 vUv;
                #include <logdepthbuf_pars_fragment>
                float blendOverlay( float base, float blend ) {
                  // return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
                  // return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
                  return 0.3 * base * blend;
                }
                vec3 blendOverlay( vec3 base, vec3 blend ) {
                  return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );
                }
                void main() {
                  #include <logdepthbuf_fragment>
                  vec4 base = texture2DProj( tDiffuse, vUv );
                  gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );
                  // gl_FragColor = vec4( blendOverlay( base.rgb, color ), .01 );
                  // gl_FragColor = vec4( base.rgb, base.a - 0.7 );
                  #include <tonemapping_fragment>
                  #include <colorspace_fragment>
                }`,
      },
    })

    return groundMirror
  }

  return {
    createReflector,
  }
}
