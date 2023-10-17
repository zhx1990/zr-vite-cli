import { request, adapter } from '@/service/request'

const Source = {
  getUser: '/dx-forecast/web/mine/getUser',
}
// 密码登录
export const mineUserInfo = async () => {
  const data = await request.get<Auth.UserInfo>(Source.getUser)
  return adapter(adapterOfMineUserInfo, data)
}

function adapterOfMineUserInfo(data: Auth.UserInfo | null): Auth.UserInfo | null {
  if (!data) return null

  return { ...data, userRole: 'admin' }
}
