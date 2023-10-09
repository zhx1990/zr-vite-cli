import type { MethodType, MockMethod } from 'vite-plugin-mock'
import type { BaseMockOptions } from '../../../base'
import mockBase from '../../../base'
import MockOption = Service.MockOption

const options: BaseMockOptions = {
  name: 'crud/list-page',
  idGenerator: 0,
  copyTimes: 1,
  list: [
    {
      time: '2023-07-09',
      personnel: '巡检人员',
      state: '1',
      count: 0,
      sTime: '2023-01-22 10:00:00',
      eTime: '2023-01-22 12:00:00',
    },
  ],
}
const mockedApis = mockBase.buildMock(options)

const apis: MockMethod[] = []

for (const mockedApi of mockedApis) {
  apis.push({
    url: mockedApi.path,
    method: mockedApi.method as MethodType,
    response: (request: MockOption) => mockedApi.handle(request),
  })
}

export default apis
