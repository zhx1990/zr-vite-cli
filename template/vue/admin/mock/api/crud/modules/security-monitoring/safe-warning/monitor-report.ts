import type { MethodType, MockMethod } from 'vite-plugin-mock'
import type { BaseMockOptions } from '../../../base'
import mockBase from '../../../base'
import MockOption = Service.MockOption

const options: BaseMockOptions = {
  name: 'crud/monitor-report',
  idGenerator: 0,
  copyTimes: 100,
  list: [
    {
      name: '水库大坝',
      reportName: '坝体表面位移',
      type: '大坝整体安全监测年报',
      state: '0',
      ew: '超汛限水位',
      time: '2020-01-01 02:02:02',
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
