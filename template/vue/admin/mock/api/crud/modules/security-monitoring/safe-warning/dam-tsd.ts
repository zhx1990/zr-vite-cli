import type { MethodType, MockMethod } from 'vite-plugin-mock'
import type { BaseMockOptions } from '../../../base'
import mockBase from '../../../base'
import MockOption = Service.MockOption

const options: BaseMockOptions = {
  name: 'crud/dam-tsd',
  idGenerator: 0,
  copyTimes: 1,
  list: [
    {
      name: '水位',
      cause: '超汛限水位',
      ul: '10',
      dl: '20',
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
