import type { VNode } from 'vue'

export interface IBaseLayerTooltipCollapsePanelData {
  label?: string | (() => VNode)
  value: string
  imgPath?: string
  onClick?: () => void
}

export interface IBaseLayerTooltipCollapsePanelProps {
  // 按钮文本
  label: string
  // 按钮图标
  imgPath: string
  // 面板标题
  panelTitle: string
  // 加载
  loading?: boolean
  // 是否空
  empty?: boolean
}

export interface IBaseLayerTooltipCollapsePlotData {
  tipLabel: string
  icon: () => VNode
  onClick?: () => void
}
