import type { MockMethod } from 'vite-plugin-mock'
import { localStg } from '@/utils'
import { routeModel, userModel } from '../model'

const apis: MockMethod[] = [
  {
    url: '/mock/getUserRoutes',
    method: 'post',
    response: (options: Service.MockOption): Service.MockServiceResult => {
      const { id = undefined } = options.body

      const routeHomeName: AuthRoute.LastDegreeRouteKey = 'map-picture'
      // const userModel = localStg.get('userInfo')

      const role = userModel.find((item) => item.id === id)?.userRole || 'user'

      const filterRoutes = routeModel[role]

      return {
        code: 200,
        message: 'ok',
        data: {
          routes: filterRoutes,
          home: routeHomeName,
        },
      }
    },
  },
]

export default apis
