import { request, resHandle } from '@/service/request'

export const Source = {
  adminFileUpload: '/cma/admin/file/upload',
}

// 文件上传
export const adminFileUpload = async (data) => {
  const res = await request.post(Source.adminFileUpload, data)
  return resHandle(res)
}
