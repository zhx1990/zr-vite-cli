export const LEGEND_TYPE_1 = [
  { value: 9, icon: 'qxz', label: '水文站' },
  { value: 8, icon: 'swllz&tjswz', label: '水位站' },
  { value: 7, icon: 'ylz', label: '雨量站' },
  { value: 4, icon: 'small01', label: '小（1）型' },
  { value: 5, icon: 'small02', label: '小（2）型' },
  { value: 3, icon: 'middle', label: '中型' },
  { value: 1, icon: 'big', label: '大（1）型' },
  { value: 2, icon: 'big', label: '大（2）型' },
  { value: 6, icon: 'defaultIcon', label: '其他' },
]

export const LEGEND_TYPE_2 = [
  {
    value: '2D-IMG',
    label: '矢量',
    thumb: '/image/product.png',
  },
  {
    value: '2D-VEC',
    label: '卫星',
    thumb: '/image/product.png',
  },
  {
    value: '2D-TER',
    label: '地形',
    thumb: '/image/product.png',
  },
  {
    value: '3D',
    label: '三维',
    thumb: '/image/product.png',
  },
]

// 指定value获取
export const getLegendTypeByValue = (value: number) =>
  LEGEND_TYPE_1.find((item) => item.value === value)
