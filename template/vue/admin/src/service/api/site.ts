import { request, resHandle } from '@/utils/request'

const Source = {
  siteConfig: '/cma/site/config',
  siteTicketLogin: '/mlr-project/web/site/ticketLogin',
  siteBuildServerUrl: '/mlr-project/web/site/buildServerUrl',
  sitePwdLogin: '/sys/admin/site/pwdLogin',
  siteRedirect: '/sys/admin/site/redirect',
  siteLogout: '/sys/admin/site/logout',
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
