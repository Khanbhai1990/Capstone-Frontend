import Vue from 'vue'
import App from './App'
import { store } from './store/store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuetify from 'vuetify'

import router from './router'

import '../node_modules/vuetify/dist/vuetify.min.css'


Vue.use(Vuetify);

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://localhost:8000'

Vue.config.productionTip = false
Vue.router = router



Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'type'
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// const router = new VueRouter ({
//     router,
//     mode: 'history'
// });



// axios.defaults.headers.common['Authorization'] = "fasfdsa"
// axios.defaults.headers.get['Accepts'] = 'application/json'

// axios.interceptors.request.use( config => {
//   console.log("Request Interceptor", config)
//   return config
// })
//
// axios.interceptors.response.use(res => {
//   console.log("Response Interceptor", res)
//   return res
// })

// axios.interceptors.request.eject(reqInterceptor)
// axios.interceptors.response.eject(resInterceptor)
