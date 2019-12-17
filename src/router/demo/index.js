export default [
  {
    path: '/',
    name: 'welcome',
    component: () =>
      import(/* webpackChunkName: "demo" */ '@/views/layout.vue'),
    redirect: '/demo',
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
