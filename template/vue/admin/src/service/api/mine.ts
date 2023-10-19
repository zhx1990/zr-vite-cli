import { request, adapter } from '@/service/request'

const Source = {
  mineUserInfo: '/sys/admin/mine/userInfo',
}
// 获取用户
export const mineUserInfo = async () => {
  const data = await request.get<Auth.UserInfo>(Source.mineUserInfo)
  return adapter(adapterOfMineUserInfo, data)
}

function adapterOfMineUserInfo(data: Auth.UserInfo | null): Auth.UserInfo | null {
  if (!data) return null

  return { ...data, userRole: 'admin' }
}
