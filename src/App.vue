<template>
    <v-content color="blue ligthen-4">
    <v-toolbar color="cyan lighten-1" app absolute clipped-left>
        <app-header-loggedin v-if="loggedIn"></app-header-loggedin>
        <app-header v-else></app-header>
    </v-toolbar>
    <transition name="slide-fade">
    <router-view></router-view>
  </transition>

    <v-footer class="blue ligthen-4"><app-footer></app-footer></v-footer>
    </v-content>
</template>

<script>
    import Header from './components/Header';
    import HeaderLoggedin from './components/loggedframe/HeaderLoggedIn';
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
