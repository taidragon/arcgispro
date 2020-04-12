export default [
  {
    path: '/',
    name: 'welcome',
    component: () =>
      import(/* webpackChunkName: "demo" */ '@/views/layout.vue'),
    redirect: '/getCoordinate',
    meta: {
      title: ''
    },
    children: [
      {
        path: '/demo',
        name: 'demo',
        component: () =>
          import(/* webpackChunkName: "demo" */ '@/views/demo/demo.vue'),
        meta: {
          title: ''
        }
      },
      {
        path: '/baseMap',
        name: 'baseMap',
        component: () =>
          import(/* webpackChunkName: "demo" */ '@/views/baseMap/baseMap.vue'),
        meta: {
          title: ''
        }
      },
      {
        path: '/curtain',
        name: 'curtain',
        component: () =>
          import(/* webpackChunkName: "demo" */ '@/views/curtain/curtain.vue'),
        meta: {
          title: ''
        }
      },
      {
        path: '/getCoordinate',
        name: 'getCoordinate',
        component: () =>
          import(/* webpackChunkName: "demo" */ '@/views/getCoordinate/getCoordinate.vue'),
        meta: {
          title: ''
        }
      },
      {
        path: '/gpMap',
        name: 'gpMap',
        component: () =>
          import(/* webpackChunkName: "demo" */ '@/views/gpMap/gpMap.vue'),
        meta: {
          title: ''
        }
      }
    ]
  }
]
