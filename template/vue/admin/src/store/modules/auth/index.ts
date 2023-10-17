import { unref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { useRouterPush } from '@/hooks'
import { localStg, getQueryByName } from '@/utils'
import { sitePwdLogin, ticketLogin, buildServerUrl, getUser } from '@/service/api'
import { useRoute, useRouter } from 'vue-router'
import { useTabStore } from '../tab'
import { useRouteStore } from '../route'
import { getToken, getUserInfo, clearAuthStorage } from './helpers'

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo
  /** 用户token */
  token:
    | {
        tokenName: string
        tokenValue: string
      }
    | ''
  /** 登录的加载状态 */
  loginLoading: boolean
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    /**
     * 单点登录登录状态
     * @description:
     * @return {*}
     */
    async loginStatus() {
      const ticket = getQueryByName('ticket')
      console.log('ticket :>> ', ticket)
      if (ticket) {
        this.loginByTicket(ticket)
      } else {
        this.getTicket()
      }
    },
    /**
     * 跳转公用登录页面获取ticket
     * @return {*}
     */
    async getTicket() {
      const route = useRoute()
      const url = await buildServerUrl({
        clientUrl: window.location.origin,
        back: (route?.query?.redirect as string) || '/',
      })
      if (url) {
        window.location.href = url
      }
      window.$notification?.error({
        title: '单点登录失败!',
        content: `请联系管理员!`,
        duration: 3000,
      })
    },

    /**
     * 根据ticket登录
     * @description:
     * @param {string} ticket
     * @return {*}
     */
    async loginByTicket(ticket: string) {
      const route = useRoute()
      const routeStore = useRouteStore()
      const loginInfo = await ticketLogin(ticket)
      localStg.set('tokenInfo', loginInfo)
      const { data } = await getUser()
      if (data) {
        localStg.set('userInfo', data)
        await routeStore.initAuthRoute()
        // 登录成功弹出欢迎提示
        if (routeStore.isInitAuthRoute) {
          window.$notification?.success({
            title: '登录成功!',
            content: `欢迎回来，${this.userInfo.name}!`,
            duration: 3000,
          })
          router.push(decodeURIComponent((route?.query?.redirect as string) || '/'))
        }
      }
    },
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false)
      const { resetTabStore } = useTabStore()
      const { resetRouteStore } = useRouteStore()
      const route = unref(router.currentRoute)

      clearAuthStorage()
      this.$reset()

      if (route.meta.requiresAuth) {
        toLogin()
      }

      nextTick(() => {
        resetTabStore()
        resetRouteStore()
      })
    },
    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async handleActionAfterLogin(res: ApiSite.LoginRes) {
      const route = useRouteStore()
      const { toLoginRedirect } = useRouterPush(false)

      const loginSuccess = await this.loginByToken(res)

      if (loginSuccess) {
        await route.initAuthRoute()

        // 跳转登录后的地址
        toLoginRedirect()

        console.log('userInfo==>', this.userInfo)
        // 登录成功弹出欢迎提示
        if (route.isInitAuthRoute) {
          window.$notification?.success({
            title: '登录成功!',
            content: `欢迎回来，${this.userInfo.name}!`,
            duration: 3000,
          })
        }

        return
      }

      // 不成功则重置状态
      this.resetAuthStore()
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(res: ApiSite.LoginRes) {
      let successFlag = false

      // 先把token存储到缓存中(后面接口的请求头需要token)
      // const { tokenName, tokenValue } = res
      // localStg.set('tokenName', tokenName)
      // localStg.set('tokenValue', tokenValue)
      // localStg.set('tokenInfo', res)

      // 获取用户信息
      const { data } = await getUser()
      if (data) {
        // 成功后把用户信息存储到缓存中
        localStg.set('userInfo', data)

        // 更新状态
        this.userInfo = data
        this.token = res

        successFlag = true
      }

      return successFlag
    },
    /**
     * 登录
     * @param userName - 用户名
     * @param password - 密码
     */
    async login(params: ApiSite.PwdLoginParams) {
      this.loginLoading = true

      const { data } = await sitePwdLogin(params)

      if (data) {
        await this.handleActionAfterLogin(data)
      }
      this.loginLoading = false
    },
  },
})
