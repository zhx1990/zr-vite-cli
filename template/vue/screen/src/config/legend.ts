export const LEGEND_TYPE_1 = [
  { value: 1, icon: 'icon_legend4', label: '水库站' },
  { value: 2, icon: 'icon_legend5', label: '视频站' },
  { value: 3, icon: 'icon_legend1', label: '水文站' },
  { value: 4, icon: 'icon_legend2', label: '水位站' },
  { value: 5, icon: 'icon_legend3', label: '雨量站' },
  { value: 6, icon: 'icon_legend8', label: '其他' },
  { value: 100, icon: '', label: '水面' },
  { value: 200, icon: 'icon_legend9', label: '告警' },
  { value: 300, icon: '', label: '隐藏监测测要素' },
]

export const LEGEND_TYPE_2 = [
  {
    value: '2D-IMG',
    label: '影像',
    imgPath: '/images/systems/pic_map2.png',
  },
  {
    value: '2D-VEC',
    label: '地图',
    imgPath: '/images/systems/pic_map1.png',
  },
  {
    value: '2D-TER',
    label: '地形',
    imgPath: '/images/systems/pic_map3.png',
  },
  {
    value: '3D',
    label: '三维',
    imgPath: '/images/systems/pic_map4.png',
  },
]

// 指定value获取
export const getLegendTypeByValue = (value: number) =>
  LEGEND_TYPE_1.find((item) => item.value === value)
