import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueMediaEmbed from 'vue-media-embed'

// import * as actions from './actions';
// import * as mutations from './mutations';
import * as getters from './getters';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
        loginIn:3,
        loggedIn: true,
        token: null,
        user: null
    },
  mutations: {
      login: (state, token) => {
          state.token = token
        },
      userData: (state, user) => {
          state.user = user
      }

  },
  actions: {
      login: ({ commit }, token)=> {
        commit('login', token)
      },
      userData: ({ commit }, user)=> {
        commit('userData', user)
      }
  },
  getters
        // getters: {
        //     user (state) {
        //         return state.user
        //     }
        // }

});

Vue.use(VueMediaEmbed, { store })
