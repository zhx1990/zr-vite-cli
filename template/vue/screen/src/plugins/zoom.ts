export function setupZoom(cw = 1920, ch = 1080) {
  // const cw = 1920
  // const ch = 1080
  const body = document.getElementById('body') as HTMLBodyElement
  body.style.width = `${cw}px`
  body.style.height = `${ch}px`

  // 对body进行缩放
  function windowResize() {
    // 窗口宽高
    const w = window.innerWidth
    // const w = window.screen.width
    const h = window.innerHeight
    // const h = window.screen.height
    // 缩放比例
    const r = w / cw < h / ch ? w / cw : h / ch
    // const r = w / cw
    // const r = h / ch
    // body.style.transform = `scale( ${r})`
    // @ts-ignore
    body.style.zoom = r
    // document.documentElement.style.setProperty('--app-scale', scale)
    // 因为scale是以body的原中心点为基准进行缩放，所以缩放之后需要调整外边距，使其位于窗口的中心位置
    // body.style.marginLeft = -(cw - r * cw) / 2 + (w - r * cw) / 2 + 'px'
    // body.style.marginTop = -(ch - r * ch) / 2 + (h - r * ch) / 2 + 'px'
    // body.style.marginBottom = -(h > ch ? h : ch - r * ch) + 'px'
    // body.style.marginRight = -(w > cw ? w : cw - r * cw) + 'px'
  }
  function fnResize() {
    // const screenWidth = window.screen.width
    const screenWidth = window.innerWidth
    // const screenHeight = window.screen.height
    const screenHeight = window.innerHeight
    const xScale = screenWidth / cw
    const yScale = screenHeight / ch
    body.setAttribute('transform', `scale(${xScale},${yScale})`)
  }
  function init() {
    fnResize()
    windowResize()
  }
  init()
  window.addEventListener('resize', init)
}
