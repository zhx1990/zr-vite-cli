import { unref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { router } from '@/router'
import { useRouterPush } from '@/hooks'
import { localStg } from '@/utils'
import { sitePwdLogin, mineUserInfo } from '@/service'
import { useTabStore } from '../tab'
import { useRouteStore } from '../route'
import { getToken, getUserInfo, clearAuthStorage } from './helpers'

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo
  /** 用户token */
  token: string
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
    async handleActionAfterLogin(res: ApiSite.PwdLoginRes) {
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
    async loginByToken(res: ApiSite.PwdLoginRes) {
      let successFlag = false

      // 先把token存储到缓存中(后面接口的请求头需要token)
      const { tokenName, tokenValue } = res
      localStg.set('tokenName', tokenName)
      localStg.set('tokenValue', tokenValue)

      // 获取用户信息
      const { data } = await mineUserInfo()
      if (data) {
        // 成功后把用户信息存储到缓存中
        localStg.set('userInfo', data)

        // 更新状态
        this.userInfo = data
        this.token = tokenValue

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
