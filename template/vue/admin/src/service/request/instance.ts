import axios from 'axios'
import type { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { useRouterPush } from '@/hooks'
import { localStg } from '@/utils'
import { useAuthStore } from '@/store'
import {
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData,
} from '../utils'

/**
 * 封装axios请求类
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance

  backendConfig: Service.BackendResultConfig

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'errorCode',
      dataKey: 'data',
      msgKey: 'errorMessage',
      showType: 0,
      host: '',
      success: true,
    }
  ) {
    this.backendConfig = backendConfig
    this.instance = axios.create(axiosConfig)
    this.setInterceptor()
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async (config) => {
        const handleConfig = { ...config }
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as UnionKey.ContentType
          handleConfig.data = await transformRequestData(handleConfig.data, contentType)
          // 设置token
          const tokenInfo = localStg.get('tokenInfo')
          const tokenName = tokenInfo?.tokenName || ''
          const tokenValue = tokenInfo?.tokenValue || ''
          // handleConfig.headers.Authorization = localStg.get('tokenValue') || ''
          if (tokenName && tokenValue) handleConfig.headers[tokenName] = tokenValue
        }
        return handleConfig
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError)
        return handleServiceResult(error, null)
      }
    )
    this.instance.interceptors.response.use(
      (async (response) => {
        const { status } = response
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data
          // 请求成功
          if (backend.success) {
            return handleServiceResult(null, backend)
          }
          if (backend?.errorCode === 'A0200') {
            const auth = useAuthStore()
            auth.resetAuthStore()
            const { toLogin } = useRouterPush(false)
            toLogin()
          }
          const error = handleBackendError(backend, this.backendConfig)
          return handleServiceResult(error, backend)
        }
        const error = handleResponseError(response)
        return handleServiceResult(error, null)
      }) as any,
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError)
        return handleServiceResult(error, null)
      }
    )
  }
}
