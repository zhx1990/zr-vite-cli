import { defineConfig, loadEnv } from 'vite'
// import postCssPxToRem from 'postcss-pxtorem'
import { createViteProxy, getRootPath, getSrcPath, setupVitePlugins, viteDefine } from './build'
import { getServiceEnvConfig } from './.env-config'

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as any
  const rootPath = getRootPath()
  const srcPath = getSrcPath()

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'Y'
  const envConfig = getServiceEnvConfig(viteEnv)

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    define: viteDefine,
    plugins: setupVitePlugins(viteEnv),

    css: {
      // postcss: {
      //   plugins: [
      //     postCssPxToRem({
      //       rootValue: 192,
      //       unitPrecision: 5,
      //       propList: ['*'],
      //       selectorBlackList: [],
      //       // replace: true,
      //       // mediaQuery: false,
      //       // minPixelValue: 0,
      //     }),
      //   ],
      // },
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/assets/styles/scss/global.scss" as *;`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3200,
      open: false,
      proxy: createViteProxy(isOpenProxy, envConfig),
    },
    optimizeDeps: {
      include: [
        '@better-scroll/core',
        'echarts',
        'swiper',
        'swiper/vue',
        'vditor',
        'wangeditor',
        'xgplayer',
      ],
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
