import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { store } from './store/store'
import axios from 'axios'
import Vuetify from 'vuetify'

import { routes } from './routes'

import '../node_modules/vuetify/dist/vuetify.min.css'


Vue.use(Vuetify);

Vue.use(VueRouter);

axios.defaults.baseURL = "http://localhost:8000"
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

const router = new VueRouter ({
    routes,
    mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
