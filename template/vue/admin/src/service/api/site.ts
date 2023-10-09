import { request } from '@/service/request'

const Source = {
  sitePwdLogin: '/cma/site/pwdLogin',
  siteConfig: '/cma/site/config',
}

// 密码登录
export const sitePwdLogin = (data: ApiSite.PwdLoginParams) =>
  request.post<ApiSite.PwdLoginRes>(Source.sitePwdLogin, data)
// 获取系统配置
export const siteConfig = () => request.get(Source.siteConfig)
