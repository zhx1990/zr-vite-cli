const mapPicture: AuthRoute.Route = {
  name: 'map-picture',
  path: '/map-picture',
  component: 'self',
  meta: { title: '一张图', icon: 'mdi:menu', singleLayout: 'basic', order: 1, requiresAuth: true },
  children: [],
}

export default mapPicture
