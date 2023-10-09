import { MockMethod } from 'vite-plugin-mock'
import cascaderData from './cascader-data'
import pcaDataLittle from './pca-data-little'
import { TreeNodesLazyLoader, getPcaData } from './pcas-data'

const openStatus = [
  { value: '1', label: '打开', color: 'success' },
  { value: '2', label: '停止', color: 'warning' },
  { value: '0', label: '关闭', color: 'error' },
]

const moreOpenStatus = [
  { value: '1', label: '打开(open)', color: 'success' },
  { value: '2', label: '停止(stop)', color: 'warning' },
  { value: '0', label: '关闭(close)', color: 'error' },
]

const textStatus = [
  { id: '1', text: '打开', color: 'success' },
  { id: '2', text: '停止', color: 'warning' },
  { id: '0', text: '关闭', color: 'error' },
]

export function GetTreeChildrenByParentId(parentId) {
  return TreeNodesLazyLoader.getChildren(parentId)
}

export function GetNodesByValues(values) {
  return TreeNodesLazyLoader.getNodesByValues(values)
}

const dics: MockMethod[] = [
  {
    url: '/mock/dicts/OpenStatusEnum',
    method: 'get',
    response() {
      return {
        code: 200,
        message: 'success',
        data: openStatus,
      }
    },
  },
  {
    url: '/mock/dicts/_OpenStatusEnum2',
    method: 'get',
    response() {
      return {
        code: 200,
        message: 'success',
        data: textStatus,
      }
    },
  },
  {
    url: '/mock/dicts/moreOpenStatusEnum',
    method: 'get',
    response() {
      return {
        code: 200,
        message: 'success',
        data: moreOpenStatus,
      }
    },
  },
  {
    url: '/mock/dicts/cascaderData',
    method: 'get',
    response() {
      return {
        code: 200,
        message: 'success',
        data: cascaderData,
      }
    },
  },
  {
    url: '/mock/dicts/pca',
    method: 'get',
    async response() {
      const data = await getPcaData()
      return {
        code: 200,
        message: 'success',
        data,
      }
    },
  },
  {
    url: '/mock/dicts/littlePca',
    method: 'get',
    async response() {
      return {
        code: 200,
        message: 'success',
        data: pcaDataLittle,
      }
    },
  },
  {
    url: '/mock/tree/GetTreeChildrenByParentId',
    method: 'get',
    async response({ params }: any) {
      const list = await GetTreeChildrenByParentId(params.parentId)
      return {
        code: 200,
        message: 'success',
        data: list,
      }
    },
  },
  {
    url: '/mock/tree/GetNodesByValues',
    method: 'get',
    async response({ params }: any) {
      const list = await GetNodesByValues(params.values)
      return {
        code: 200,
        message: 'success',
        data: list,
      }
    },
  },
]

export default dics
