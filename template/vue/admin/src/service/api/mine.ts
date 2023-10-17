import { request, adapter } from '@/service/request'

const Source = {
  getUser: '/dx-forecast/web/mine/getUser',
}
// 密码登录
export const getUser = async () => {
  const data = await request.get<Auth.UserInfo>(Source.getUser)
  return adapter(adapterOfGetUser, data)
}

function adapterOfGetUser(data: Auth.UserInfo | null): Auth.UserInfo | null {
  if (!data) return null

  return { ...data, userRole: 'admin' }
}
