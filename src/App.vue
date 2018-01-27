<template>
    <v-content>
    <v-toolbar color="cyan lighten-3" app absolute clipped-left>
        <app-header-loggedin v-if="loggedIn"></app-header-loggedin>
        <app-header v-else></app-header>
    </v-toolbar>
    <transition name="slide-fade">
    <router-view></router-view>
  </transition>

    <v-footer fixed class="pa-2 cyan darken-4"><app-footer></app-footer></v-footer>
    </v-content>
</template>

<script>
    import Header from './components/Header';
    import HeaderLoggedin from './components/loggedframe/HeaderLoggedin';
    import Footer from './components/Footer';

    import { mapGetters } from 'vuex';
    export default {
      computed: {
        ...mapGetters({
          loggedIn:'navbarBoo'
        }),
      },
        components: {
            appHeader: Header,
            appHeaderLoggedin: HeaderLoggedin,
            appFooter: Footer
        }
    }
</script>
