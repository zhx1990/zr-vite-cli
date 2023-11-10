import { request, resHandle } from '@/service/request'

const Source = {
  indexBuildingList: '/dx-gis/home/index/BuildingList',
  indexLegend: '/dx-gis/home/index/legend',
  indexPointData: '/dx-gis/home/index/pointData',
  indexVideoList: '/dx-gis/home/index/videoList',
  indexVideoUrl: '/dx-gis/home/index/videoUrl',
}

// 建筑物列表
export const indexBuildingList = async () => {
  const res = await request.get(Source.indexBuildingList)
  return resHandle(res)
}
// 建筑物图例列表
export const indexLegend = async () => {
  const res = await request.get(Source.indexLegend)
  return resHandle(res)
}
// 测点最新监测数据
export const indexPointData = async (pointId: number) => {
  const res = await request.get(Source.indexPointData, { params: { pointId } })
  return resHandle(res)
}
// 获取视频站点列表
export const indexVideoList = async () => {
  const res = await request.get(Source.indexVideoList)
  return resHandle(res)
}
// 获取视频地址
export const indexVideoUrl = async (deviceIds: string[]) => {
  const res = await request.get(Source.indexVideoUrl, {
    params: { deviceIds: deviceIds.join(',') },
  })
  return resHandle(res)
}
