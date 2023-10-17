import { request, resHandle } from '@/service/request'

const Source = {
  sitePwdLogin: '/cma/site/pwdLogin',
  siteConfig: '/cma/site/config',
  ticketLogin: '/dx-forecast/web/site/ticketLogin',
  buildServerUrl: '/dx-forecast/web/site/buildServerUrl',
}

// 密码登录
export const sitePwdLogin = (data: ApiSite.PwdLoginParams) =>
  request.post<ApiSite.LoginRes>(Source.sitePwdLogin, data)
// 获取系统配置
export const siteConfig = () => request.get(Source.siteConfig)

// 获取授权登录地址
export const buildServerUrl = async (params: { clientUrl: string; back: string }) => {
  const res = await request.get<ApiSite.BuildServerUrl>(Source.buildServerUrl, { params })
  return resHandle(res)
}
// 根据ticket登录
export const ticketLogin = async (ticket: string) => {
  const res = await request.get<ApiSite.LoginRes>(Source.ticketLogin, { params: { ticket } })
  return resHandle(res)
}
