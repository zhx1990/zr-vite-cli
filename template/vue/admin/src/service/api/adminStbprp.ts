import { request, resHandle } from '@/service/request'

export const Source = {
  adminStbprpGetSttpList: '/cma/admin/stbprp/getSttpList',
  adminStbprpOption: '/cma/admin/stbprp/option',
}

// 获取站类下拉列表
export const adminStbprpGetSttpList = async () => {
  const res = await request.get<ApiAdminStbprp.getSttpList>(Source.adminStbprpGetSttpList)
  return resHandle(res)
}

// 查询测站选项列表
export const adminStbprpOption = async () => {
  const res = await request.get<ApiAdminStbprp.stbprpOption>(Source.adminStbprpOption)
  return resHandle(res)
}
