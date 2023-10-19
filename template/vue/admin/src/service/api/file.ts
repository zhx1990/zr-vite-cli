import { request, resHandle } from '@/service/request'

export const Source = {
  fileUploadOne: '/sys/admin/file/uploadOne',
}

// 文件上传
export const fileUploadOne = async (data, configs?) => {
  const res = await request.post(Source.fileUploadOne, data, {
    ...configs,
  })
  return resHandle(res)
}
