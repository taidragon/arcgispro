import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// title 字段不设置，会导致面包屑显示不全
let routes = [
  {
    path: '/demo',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/demo/demo.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const routerContext = require.context('./', true, /index\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的index.js 不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [...(routerModule.default || routerModule), ...routes]
})

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
