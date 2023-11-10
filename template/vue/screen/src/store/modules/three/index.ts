import { defineStore } from 'pinia'

interface State {
  /** 是否显示 */
  isShowThree: boolean
}

export const useThreeStore = defineStore('three-store', {
  state: (): State => ({
    isShowThree: false,
  }),
  actions: {
    setIsShowThree(isShow: boolean) {
      this.isShowThree = isShow
    },
  },
})
