import { type Component, h, render, watch } from 'vue'
import { BaseModal } from '@/components/BaseModal'
import { type DialogOptions } from 'naive-ui'

export interface ICreateModalOptions<T, P> {
  modalProps?: Common.DeepPartial<T>
  component: Component
  componentProps?: Common.DeepPartial<P>
}

export function useModal() {
  /**
   * 创建模态框
   * @param {any} component
   * @param {any} props
   * @return {*}
   * @description: 无法渲染component是fs组件
   */
  const createModal = async <T, P>(options: ICreateModalOptions<T, P>) => {
    const { component, modalProps, componentProps } = options
    const container = document.createElement('div')
    const instance = h(BaseModal, { ...modalProps }, () => h(component, { ...componentProps }))
    render(instance, container)
    document.body.appendChild(instance.el as HTMLElement)
  }

  /**
   * 创建对话框模态
   * @param {DialogOptions} options
   * @return {*}
   * @description: component是fs组件类型时候调用
   */
  const createDialog = async (options: DialogOptions) => {
    await window.$dialog?.create({
      showIcon: false,
      transformOrigin: 'center',
      ...options,
    })
  }

  return {
    createModal,
    createDialog,
  }
}
