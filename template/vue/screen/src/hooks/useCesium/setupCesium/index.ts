import * as echarts from 'echarts'

export const setupCesium = () =>
  new Promise((resolve) => {
    DC.ready({
      echarts,
    }).then(() => {
      resolve(true)
    })
  })
