const mapPicture: AuthRoute.Route = {
  name: 'map-picture',
  path: '/map-picture',
  component: 'self',
  meta: {
    title: '一张图',
    requiresAuth: true,
    singleLayout: 'basic',
    order: 2,
    imgPath: '/images/systemsNew/icon_nav4.png',
    imgActivePath: '/images/systemsNew/icon_nav4_h.png',
  },
  children: [],
}

export default mapPicture
