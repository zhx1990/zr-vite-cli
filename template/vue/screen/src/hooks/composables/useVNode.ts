import { type Component, render, h } from 'vue'

export interface ICreateVNodeOptions {
  component: Component
  componentProps?: Common.Recordable
}

export function useVNode() {
  const vNodeToDom = (options: ICreateVNodeOptions) => {
    const { component, componentProps } = options
    const container = document.createElement('div')
    const instance = h(component, { ...componentProps })
    render(instance, container)

    return instance.el as HTMLElement
  }

  return {
    vNodeToDom,
  }
}
