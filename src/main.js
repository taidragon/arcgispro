import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import ViewUI from 'view-design'

// import style
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI)
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
