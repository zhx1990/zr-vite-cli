import { type Component, type VNodeChild, h, render, createVNode, defineComponent } from 'vue'
import { BaseModal } from '@/components/BaseModal'
import { type DialogOptions } from 'naive-ui'
import { vNodeToDom } from '@/utils'

export interface ICreateModalOptions<T, P> {
  modalProps?: T
  component: Component
  componentProps?: Common.DeepPartial<P>
  children?: () => VNodeChild
}

export function useModal() {
  /**
   * 创建模态框
   * @param {any} component
   * @param {any} props
   * @return {*}
   * @description:
   */
  const createModal = async <T, P>(options: ICreateModalOptions<T, P>) => {
    const { component, modalProps, componentProps, children } = options
    // const container = document.createElement('div')
    // const instance = h(BaseModal, { ...modalProps }, () => h(component, { ...componentProps }))
    // render(instance, container)
    const instance = vNodeToDom({
      component: BaseModal,
      componentProps: { ...modalProps },
      children,
    })
    console.log('instance :>> ', instance)
    document.body.appendChild(instance)
  }

  /**
   * 创建对话框模态
   * @param {DialogOptions} options
   * @return {*}
   * @description: component是fs组件类型时候调用
   */
  const createDialog = (options: DialogOptions) => {
    window.$dialog?.create({
      showIcon: false,
      negativeText: '取消',
      positiveText: '确定',
      style: {
        width: '980px',
      },
      ...options,
    })
  }

  return {
    createModal,
    createDialog,
  }
}
