import { has } from 'lodash'
/** 统一失败和成功的请求结果的数据类型 */
export async function handleServiceResult<T = any>(error: Service.RequestError | null, data: any) {
  if (error) {
    const fail: Service.FailedResult = {
      error,
      data: null,
    } as Service.FailedResult
    if (has(data, 'showType')) fail.showType = data.showType
    if (has(data, 'host')) fail.host = data.host
    if (has(data, 'success')) fail.success = data.success

    return fail
  }
  const success: Service.SuccessResult<T> = {
    showType: data.showType,
    success: data.success,
    host: data.host,
    error: null,
    data: data.data,
  }
  return success
}

/** 请求结果的适配器：用于接收适配器函数和请求结果 */
export function adapter<T extends Service.ServiceAdapter>(
  adapterFun: T,
  ...args: Service.MultiRequestResult<Parameters<T>>
): Service.RequestResult<ReturnType<T>> {
  let result: Service.RequestResult | undefined

  const hasError = args.some((item) => {
    const flag = Boolean(item.error)
    if (flag) {
      result = {
        error: item.error,
        host: item.host,
        showType: item.showType,
        success: item.success,
        data: null,
      }
    }
    return flag
  })

  if (!hasError) {
    const adapterFunArgs = args.map((item) => item.data)
    result = {
      error: null,
      host: args[0] ? args[0].host : '',
      showType: args[0] ? args[0].showType : 0,
      success: args[0] ? args[0].success : true,
      data: adapterFun(...adapterFunArgs),
    }
  }

  return result!
}
