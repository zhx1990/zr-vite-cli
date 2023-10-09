/*
 * 枚举所有的字典
 * @Author: {haoxian1990} 149322439@qq.com
 * @Date: 2023-09-14 14:42:09
 * @LastEditors: {haoxian1990} 149322439@qq.com
 * @LastEditTime: 2023-09-21 21:31:15
 * @Description:
 */

/**
 * 将字典类型转换成option
 * @return {*}
 * @description:
 */
export const dictTypeToOption = (dictType: Common.Recordable<any>, valueToNumber = false) =>
  Object.entries(dictType).map(([key, value]) => ({
    label: value,
    value: valueToNumber ? Number(key) : key,
  }))

export const DICT_TYPE_1 = {
  gt: '超过',
  lt: '低于',
}

export const DICT_TYPE_2 = {
  z: '水位',
  q: '流量',
  p: '雨量',
  w: '水温',
  s: '含沙量',
  e: '蒸发量',
}

export const DICT_TYPE_3 = {
  1: '易涝点/低洼地',
  2: '易涝点',
  3: '低洼地',
}

export const DICT_TYPE_4 = {
  wrz: '警戒水位',
  grz: '保证水位',
  hlz: '低水位',
}

export const DICT_TYPE_5 = {
  0: '已发布',
  1: '已接收',
  2: '已完成',
  3: '已评价',
}
export const DICT_TYPE_6 = {
  1: '优',
  2: '良',
  3: '及格',
  4: '差',
}
