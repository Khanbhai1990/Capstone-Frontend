import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueMediaEmbed from 'vue-media-embed'
import createPersistedState from 'vuex-persistedstate'

// import * as actions from './actions';
// import * as mutations from './mutations';
import * as getters from './getters';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
        loginIn:3,
        loggedIn: !!localStorage.getItem("token"),
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("userData")),
        diaryData:""
    },
  mutations: {
      login: (state, token) => {
          state.token = token
        },
      userData: (state, user) => {
          state.user = user
      },
      diary_content: (state, payload)=>{
         state.diaryData = payload
      }

  },
  actions: {
      login: ({ commit }, token)=> {
        commit('login', token)
      },
      userData: ({ commit }, user)=> {
        commit('userData', user)
      },
      diary_content: ({ commit }, payload) => {
        commit('diary_content', payload);
    }
  },
  getters: {
    ...getters

  },
  // plugins: [createPersistedState()]
        // getters: {
        //     user (state) {
        //         return state.user
        //     }
        // }

});

Vue.use(VueMediaEmbed, { store })
