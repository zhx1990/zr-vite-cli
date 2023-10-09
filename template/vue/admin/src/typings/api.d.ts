// 接口数据类型

declare namespace ApiSite {
  // 密码登录
  interface PwdLoginParams {
    captchaCode?: string
    device: string
    identity: string
    password: string
    tenantId?: number
    validCodeNo?: string
  }
  interface PwdLoginRes {
    tokenName: string
    tokenTimeout: number
    tokenValue: string
  }
}

declare namespace ApiTask {
  interface TaskPage {
    countId: string
    current: number
    maxLimit: number
    optimizeCountSql: boolean
    orders: Array<{
      asc: boolean
      column: string
    }>
    pages: number
    records: Array<TaskPageRecord>
    searchCount: boolean
    size: number
    total: number
  }
  interface TaskPageRecord {
    processList: any[]
    count: number
    createdBy: number
    createdTime: string
    createdUser: {
      id: number
      name: string
      superFlag: boolean
      tenantId: number
    }
    difference: number
    express: string
    id: number
    itemList: Array<{
      description: string
      itemType: string
      minuteRate: number
    }>
    stcdList: Array<{
      drownType: number
      lgtd: number
      lttd: number
      stcd: string
      stnm: string
      sttp: string
    }>
    taskField: string
    taskName: string
    updatedBy: number
    updatedTime: string
  }
}

declare namespace ApiAdminStbprp {
  interface getSttpList {
    name: string
    sttp: string
  }
  interface stbprpOption {
    drownType: number
    lgtd: number
    lttd: number
    stcd: string
    stnm: string
    sttp: string
  }
}

declare namespace ApiMine {}

declare namespace ApiAuth {
  /** 返回的token和刷新token */
  interface Token {
    token: string
    refreshToken: string
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
  /** 后端返回的路由数据类型 */
  interface Route {
    /** 动态路由 */
    routes: AuthRoute.Route[]
    /** 路由首页对应的key */
    home: AuthRoute.AllRouteKey
  }
}

declare namespace ApiUserManagement {
  interface User {
    /** 用户id */
    id: string
    /** 用户名 */
    userName: string | null
    /** 用户年龄 */
    age: number | null
    /**
     * 用户性别
     * - 0: 女
     * - 1: 男
     */
    gender: '0' | '1' | null
    /** 用户手机号码 */
    phone: string
    /** 用户邮箱 */
    email: string | null
    /**
     * 用户状态
     * - 1: 启用
     * - 2: 禁用
     * - 3: 冻结
     * - 4: 软删除
     */
    userStatus: '1' | '2' | '3' | '4' | null
  }
}
