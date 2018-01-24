<template lang="html">
      <form>
          <v-text-field label="Email" v-model="email" required></v-text-field>
          <v-text-field label="Password" v-model="password" :type="'password'" required></v-text-field>
          <v-text-field label="Name" v-model="name" required></v-text-field>
      <v-btn @click="onSubmit">Register</v-btn>
    </form>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
          email: '',
          password: '',
          name:''
      }
    },
    methods : {
        onSubmit () {
            const formData = {
              email: this.email,
              password: this.password,
              name: this.name
            }
          axios.post('/users', formData)
            .then(res => console.log(res) )
            .catch(error => console.log(error))
        }
    }
  }
</script>

<style lang="css">
</style>
