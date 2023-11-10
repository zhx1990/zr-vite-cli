const mapPicture: AuthRoute.Route = {
  name: 'map-picture',
  path: '/map-picture',
  component: 'self',
  meta: { title: '一张图', requiresAuth: true, singleLayout: 'basic', order: 2 },
  children: [],
}

export default mapPicture
