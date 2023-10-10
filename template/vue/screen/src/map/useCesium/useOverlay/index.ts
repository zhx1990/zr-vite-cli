import type { Component } from 'vue'

export enum OVERLAY_ATTR_NAME {
  SITE_POINT = '站点',
}

export function useOverlay() {
  const toggleOverlay = (overlay: DC.Overlay) => {
    overlay.show = !overlay.show
  }
  return {
    toggleOverlay,
  }
}
