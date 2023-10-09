import { useDayJs } from '@/hooks/composables/useDayJs'
import dayjs from 'dayjs'

export type ListItem = {
  id?: number
  children?: ListItem[]
  [key: string]: any
}
export type BaseMockOptions = {
  name: string
  copyTimes?: number
  list: ListItem[]
  idGenerator: number
}
type CopyListParams = {
  originList: ListItem[]
  newList: ListItem[]
  options: BaseMockOptions
  parentId?: number
}

function copyList(props: CopyListParams) {
  const { originList, newList, options, parentId } = props
  for (const item of originList) {
    // 包含searchDate的字段，都设置为2022-01-01到2023-08-30之间的随机时间
    for (const key of Object.keys(item)) {
      if (key.includes('searchDate')) {
        item[key] = useDayJs().between('2022-01-01', '2023-08-30').format('YYYY-MM-DD HH:mm:ss')
      }
    }
    const newItem: ListItem = { ...item, parentId }
    newItem.id = options.idGenerator
    options.idGenerator += 1
    newList.push(newItem)
    if (item.children) {
      newItem.children = []
      copyList({
        originList: item.children,
        newList: newItem.children,
        options,
        parentId: newItem.id,
      })
    }
  }
}

function delById(req: Service.MockOption, list: any[]) {
  // console.log('req :>> ', req)
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i]
    if (item.id === parseInt(req.body.id, 10)) {
      list.splice(i, 1)
      break
    }
    if (item.children && item.children.length > 0) {
      delById(req, item.children)
    }
  }
}

function findById(id: number, list: ListItem[]): any {
  for (const item of list) {
    if (item.id === id) {
      return item
    }
    if (item.children && item.children.length > 0) {
      const sub = findById(id, item.children)
      if (sub !== null && sub !== undefined) {
        return sub
      }
    }
  }
  return null
}

function matchWithArrayCondition(value: any[], item: ListItem, key: string) {
  if (value.length === 0) {
    return true
  }
  let matched = false
  for (const i of value) {
    if (item[key] instanceof Array) {
      for (const j of item[key]) {
        if (i === j) {
          matched = true
          break
        }
      }
      if (matched) {
        break
      }
    } else if (
      item[key] === i ||
      (typeof item[key] === 'string' && item[key].indexOf(`${i}`) >= 0)
    ) {
      matched = true
      break
    }
    if (matched) {
      break
    }
  }
  return matched
}

function matchWithObjectCondition(value: any, item: ListItem, key: string) {
  let matched = true
  for (const key2 of Object.keys(value)) {
    const v = value[key2]
    if (v && item[key] && v !== item[key][key2]) {
      matched = false
      break
    }
  }
  return matched
}

function searchFromList(list: ListItem[], query: any) {
  console.log('query :>> ', query)
  // console.log('list :>> ', list)
  const filter = (item: ListItem) => {
    let allFound = true // 是否所有条件都符合
    for (const key of Object.keys(query)) {
      const value = query[key]
      if (value === undefined || value === null || value === '') {
        // no nothing
      } else if (value instanceof Array) {
        // 查询date范围
        if (key.includes('searchDate')) {
          const date = dayjs(item.searchDate).valueOf()
          if (date > dayjs(value[0]).valueOf() && date < dayjs(value[1]).valueOf()) {
            allFound = true
          } else {
            allFound = false
          }
        } else {
          // 如果条件中的value是数组的话，只要查到一个就行
          const matched = matchWithArrayCondition(value, item, key)
          if (!matched) {
            allFound = false
          }
        }
      } else if (value instanceof Object) {
        // 如果条件中的value是对象的话，需要每个key都匹配
        const matched = matchWithObjectCondition(value, item, key)
        if (!matched) {
          allFound = false
        }
      } else if (typeof item[key] === 'string') {
        if (!item[key].includes(value)) {
          allFound = false
        }
      } else if (typeof item[key] === 'number') {
        if (!item[key] === value) {
          allFound = false
        }
      }
    }
    return allFound
  }
  return list.filter(filter)
}

export default {
  buildMock(options: BaseMockOptions) {
    const { name } = options
    if (!options.copyTimes) {
      options.copyTimes = 29
    }
    const list: any[] = []
    for (let i = 0; i < options.copyTimes; i += 1) {
      copyList({
        originList: options.list,
        newList: list,
        options,
      })
    }
    options.list = list
    return [
      {
        path: `/mock/${name}/page`,
        method: 'post',
        handle(req: Service.MockOption) {
          let data = [...list]
          let pageSize = 20
          let current = 1
          for (const item of list) {
            if (item.children && item.children.length === 0) {
              item.hasChildren = false
              item.lazy = false
            }
          }
          let orderAsc: any
          let orderProp: any
          if (req && req.body) {
            const { pageSize: size, current: cur } = req.body
            if (size) {
              pageSize = parseInt(size, 10)
            }
            if (cur) {
              current = parseInt(cur, 10)
            }
            const query = { ...req.body }
            delete query.pageSize
            delete query.current
            delete query.sort

            if (query && Object.keys(query).length > 0) {
              data = searchFromList(list, query)
            }
          }

          let start = current * pageSize - pageSize
          let end = current * pageSize
          if (data.length < end) {
            end = data.length
          }

          if (data.length < pageSize) {
            start = 0
          }

          if (orderProp) {
            // 排序
            data.sort((a, b) => {
              let ret = 0
              if (a[orderProp] > b[orderProp]) {
                ret = 1
              } else if (a[orderProp] < b[orderProp]) {
                ret = -1
              }
              return orderAsc ? ret : -ret
            })
          }
          const records = data.slice(start, end)
          const lastOffset = data.length - (data.length % pageSize)
          if (current > lastOffset) {
            current = lastOffset
          }
          return {
            success: true,
            showType: 0,
            host: '127.0.0.1',
            data: {
              records,
              total: data.length,
              size: pageSize,
              current: current === 0 ? 1 : current,
            },
          }
        },
      },
      {
        path: `/mock/${name}/info`,
        method: 'get',
        handle(req: Service.MockOption) {
          let { id } = req.query
          id = parseInt(id, 10)
          let current = null
          for (const item of list) {
            if (item.id === id) {
              current = item
              break
            }
          }
          return {
            success: true,
            showType: 0,
            host: '127.0.0.1',
            data: current,
          }
        },
      },
      {
        path: `/mock/${name}/add`,
        method: 'post',
        handle(req: Service.MockOption) {
          req.body.id = options.idGenerator
          options.idGenerator += 1
          list.unshift(req.body)
          return {
            code: 200,
            message: 'success',
            data: req.body.id,
          }
        },
      },
      {
        path: `/mock/${name}/update`,
        method: 'post',
        handle(req: Service.MockOption) {
          const item = findById(req.body.id, list)
          if (item) {
            Object.assign(item, req.body)
          }
          return {
            success: true,
            showType: 0,
            host: '127.0.0.1',
            data: null,
          }
        },
      },
      {
        path: `/mock/${name}/delete`,
        method: 'post',
        handle(req: Service.MockOption) {
          delById(req, list)
          return {
            success: true,
            showType: 0,
            host: '127.0.0.1',
            data: null,
          }
        },
      },
      {
        path: `/mock/${name}/batchDelete`,
        method: 'post',
        handle(req: Service.MockOption) {
          const { ids } = req.body
          for (let i = list.length - 1; i >= 0; i -= 1) {
            const item = list[i]
            if (ids.indexOf(item.id) >= 0) {
              list.splice(i, 1)
            }
          }
          return {
            success: true,
            showType: 0,
            host: '127.0.0.1',
            data: null,
          }
        },
      },
      {
        path: `/mock/${name}/all`,
        method: 'post',
        handle() {
          return {
            success: true,
            showType: 0,
            host: '127.0.0.1',
            data: list,
          }
        },
      },
    ]
  },
}
