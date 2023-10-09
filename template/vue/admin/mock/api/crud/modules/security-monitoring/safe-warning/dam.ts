import type { MethodType, MockMethod } from 'vite-plugin-mock'
import type { BaseMockOptions } from '../../../base'
import mockBase from '../../../base'
import MockOption = Service.MockOption

const options: BaseMockOptions = {
  name: 'crud/dam',
  idGenerator: 0,
  copyTimes: 1,
  list: [
    {
      buildName: '水库大坝',
      stationNo: 'CF1',
      stationName: '测点',
      project: '裂缝',
      device: '裂缝计',
      msg: ['部门2'],
    },
    {
      buildName: '水库大坝',
      stationNo: 'CF2',
      stationName: '测点',
      project: '裂缝',
      device: '裂缝计',
      msg: ['部门1'],
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
