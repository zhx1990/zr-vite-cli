import { request, resHandle } from '@/service/request'

export const Source = {
  adminFileUpload: '/cma/admin/file/upload',
  adminFileDetail: '/cma/admin/file/detail',
}

// 文件上传
export const adminFileUpload = async (data, configs?) => {
  const res = await request.post(Source.adminFileUpload, data, {
    ...configs,
  })
  return resHandle(res)
}
// 获取文件
export const adminFileDetail = async (id) => {
  const res = await request.get(`${Source.adminFileDetail}/${id}`)
  return resHandle(res)
}