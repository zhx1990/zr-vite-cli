import type { MethodType, MockMethod } from 'vite-plugin-mock'
import type { BaseMockOptions } from '../../../base'
import mockBase from '../../../base'
import MockOption = Service.MockOption

const options: BaseMockOptions = {
  name: 'crud/early-warning',
  idGenerator: 0,
  copyTimes: 100,
  list: [
    {
      buildName: '水库大坝',
      project: '坝体表面位移',
      physicalQuantity: '水平垂向位移',
      alarmMeasurement: '72m',
      currentMeasurement: '72m',
      state: '0',
      ew: '超汛限水位',
      ewTime: '2020-01-01 02:02:02',
      rTime: '2020-01-01 02:02:02',
      site: '问题巡检中',
    },
    {
      buildName: '水库大坝',
      project: '坝体表面位移2',
      physicalQuantity: '水平垂向位移',
      alarmMeasurement: '72m',
      currentMeasurement: '72m',
      state: '1',
      ew: '超汛限水位',
      ewTime: '2020-01-01 02:02:02',
      rTime: '2020-01-01 02:02:02',
      site: '问题巡检中',
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
