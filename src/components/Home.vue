<template lang="html">

  <v-container fluid grid-list-md>
          <!-- <app-login v-if="loginIn == 1"></app-login>
          <app-signup v-else-if="loginIn == 2"></app-signup>
          <app-active v-else-if="loginIn == 3"></app-active>
          <app-active v-else-if="loginIn == 4"></app-active>
          <app-my-challenges v-else-if="loginIn == 5"></app-my-challenges>
          <app-create v-else-if="loginIn == 6"></app-create> -->
          <app-login></app-login>
          <app-signup></app-signup>
          <app-search></app-search>
          <app-active></app-active>
          <app-my-challenges></app-my-challenges>
          <app-create></app-create>

  </v-container>

</template>

<script>
    import Login from './pre-login/Login';
    import Signup from './pre-login/Signup';
    import Search from './loggedframe/Search';
    import Active from './loggedframe/Active';
    import MyChallenges from './loggedframe/MyChallenges';
    import Create from './loggedframe/Create';
export default {
  computed: {
      loginIn () {
          return this.$store.state.loginIn;
      }
  },
  components: {
      appLogin: Login,
      appSignup: Signup,
      appSearch: Search,
      appActive: Active,
      appMyChallenges: MyChallenges,
      appCreate: Create
  }
}
</script>

<style lang="css">
</style>
