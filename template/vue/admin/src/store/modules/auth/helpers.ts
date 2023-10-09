import { localStg } from '@/utils'

/** 获取token */
export function getToken() {
  return localStg.get('tokenValue') || ''
}

/** 获取用户信息 */
export function getUserInfo() {
  const emptyInfo: Partial<Auth.UserInfo> = {
    id: '',
    name: '',
    userRole: 'user',
  }
  const userInfo: Auth.UserInfo = localStg.get('userInfo') || (emptyInfo as Auth.UserInfo)

  return userInfo
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  localStg.remove('tokenValue')
  localStg.remove('tokenName')
  localStg.remove('userInfo')
}
