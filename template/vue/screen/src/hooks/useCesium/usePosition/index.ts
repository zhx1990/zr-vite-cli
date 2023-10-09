import { viewer } from '../index'

export const positionConfig = {
  china: [116.435314, 40.960521, 20000000.0],
  lyCenter: [119.54388302, 26.48839481, 80000],
}
export function usePosition() {
  /**
   * 创建位置
   * @return {*}
   * @description:
   */
  const position = (
    lng: Number,
    lat: Number,
    alt?: Number,
    heading?: Number,
    pitch?: Number,
    roll?: Number
  ) => new DC.Position(lng, lat, alt, heading, pitch, roll)

  /**
   * 飞入到指定位置
   * @return {*}
   * @description:
   */
  const flyToPosition = (
    position: String | Array<Number> | Common.Recordable | DC.Position,
    completeCallback?: Function,
    duration = 1
  ) => {
    viewer.value?.flyToPosition(position, completeCallback, duration)
  }

  const flyToTarget = (targer: DC.Overlay | DC.Layer, duration?: Number) => {
    viewer.value?.flyTo(targer, duration)
  }

  const zoomToPosition = (
    position: String | Array<Number> | Common.Recordable | DC.Position,
    completeCallback?: Function
  ) => {
    viewer.value?.zoomToPosition(position, completeCallback)
  }

  const zoomToTarget = (targer: DC.Overlay | DC.Layer) => {
    viewer.value?.zoomTo(targer)
  }
  const defaultPosition = () => {
    zoomToPosition(positionConfig.lyCenter)
  }

  return {
    position,
    flyToPosition,
    flyToTarget,
    zoomToPosition,
    zoomToTarget,
    defaultPosition,
  }
}
