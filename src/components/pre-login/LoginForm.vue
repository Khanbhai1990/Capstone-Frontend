<template lang="html">
  <div class="">
    <form>
        <v-text-field
          label="Email"
          v-model="email"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          required
        ></v-text-field>
    <v-btn @click="onSubmit">Login</v-btn>
    <v-btn>Register</v-btn>
  </form>
  <span v-if="errMsg">Invalid login details</span>
  </div>

</template>

<script>
  import { mapActions } from 'vuex';
  import axios from "axios"
  export default {
    name: 'Login',
      data () {
          return {
              email: '',
              password: '',
              errMsg:false
          }
      },
      methods: {
          ...mapActions([
              'login',
              'userData'
          ]),
          onSubmit() {
              let redirect = this.$auth.redirect()
              this.$auth.login({
                  data: {
                  email: this.email,
                  password: this.password
              },
              success(data) {
                  console.log('data', data)
                  this.$auth.token(null, data.data.token)
                  localStorage.setItem('token', data.data.token)
                  localStorage.setItem('userData', JSON.stringify(data.data.user[0]))
                  this.$auth.user(data.data.user[0])
                  console.log('user', this.$auth.user())
                  // console.log("this is the email", $auth.user().email)
                  this.login(this.$auth.token(null, data.data.token))
                  this.userData(this.$auth.user())
              },
              error(err) {
                this.errMsg = true
              },
              redirect: { name: redirect ? redirect.from.name : 'ActiveList' }
              })
          }
      }
  }
</script>

<style lang="css">
</style>
