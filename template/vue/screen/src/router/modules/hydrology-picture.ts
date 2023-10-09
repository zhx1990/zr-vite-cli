const hydrologyPicture: AuthRoute.Route = {
  name: 'hydrology-picture',
  path: '/hydrology-picture',
  component: 'self',
  meta: { title: '水文一张图', requiresAuth: true, singleLayout: 'basic', order: 2 },
  children: [],
}

export default hydrologyPicture
