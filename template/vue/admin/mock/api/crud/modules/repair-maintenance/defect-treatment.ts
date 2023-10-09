import type { MethodType, MockMethod } from 'vite-plugin-mock'
import type { BaseMockOptions } from '../../base'
import mockBase from '../../base'
import MockOption = Service.MockOption

const options: BaseMockOptions = {
  name: 'crud/defect-treatment',
  idGenerator: 0,
  copyTimes: 1,
  list: [
    {
      a: '发现坝体出现明显明流，建议整改',
      b: '坝体检查',
      c: '发现人',
      d: '处理人',
      state: '0',
      time: '2023-01-01',
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
