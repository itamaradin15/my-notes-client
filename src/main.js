import './bootstrap'

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './routes/index'
import store from './store/store'
import './registerServiceWorker'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
