import { request, resHandle } from '@/service/request'

const Source = {
  siteConfig: '/dx-gis/site/config',
  siteTicketLogin: '/dx-gis/web/site/ticketLogin',
  siteBuildServerUrl: '/dx-gis/web/site/buildServerUrl',
  sitePwdLogin: '/dx-gis/web/site/pwdLogin',
  siteRedirect: '/dx-gis/web/site/redirect',
  siteLogout: '/dx-gis/web/site/logout',
}

// 密码登录
export const sitePwdLogin = (data: ApiSite.PwdLoginParams) =>
  request.post<ApiSite.LoginRes>(Source.sitePwdLogin, data)

// 退出登录
export const siteLogout = async (device: string) => {
  const res = await request.post(`${Source.siteLogout}/${device}`)
  return resHandle(res)
}
// 获取系统配置
export const siteConfig = () => request.get(Source.siteConfig)

// 登录完成回调地址
export const siteRedirect = async (params: { clientUrl: string }) =>
  request.get(Source.siteRedirect, { params })

// 获取授权登录地址
export const siteBuildServerUrl = async (params: { clientUrl: string; back: string }) => {
  const res = await request.get<ApiSite.BuildServerUrl>(Source.siteBuildServerUrl, { params })
  return resHandle(res)
}
// 根据ticket登录
export const siteTicketLogin = async (ticket: string) => {
  const res = await request.get<ApiSite.LoginRes>(Source.siteTicketLogin, { params: { ticket } })
  return resHandle(res)
}
