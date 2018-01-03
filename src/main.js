// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import Mint from 'mint-ui'
import ECharts from 'vue-echarts/components/ECharts.vue'
// import 'lib-flexible'
import '@/styles/global/iconfont.css'
import '@/styles/global/reset.css'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false
Vue.use(Mint)
Vue.use(ECharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
