<template lang="html">
  <v-layout row wrap>
    <v-flex d-flex xs12 sm6 md6>
        <v-card color="green" dark>
          <v-card-title primary class="title">Project Ten</v-card-title>
          <hr color="blue">
          <v-card-text>
            <h3>Project Ten is an application that provides the user a template to create challenges
            lasting ten days. The challenges can then be shared with the user’s friends(online or in real life)
            and family. The challenges could be related to health and well being, or something trivial (like binge watching all Marvel movies for ten days straight!).
            It’s completely up to users to come up with the content; sky’s the limit.</h3>
             <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md6>
          <app-login-form></app-login-form>
      </v-flex>
      <v-flex d-flex xs12 sm6 md12>
            <v-carousel hide-controls hide-delimiters>
                <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
            </v-carousel>
      </v-flex>
  </v-layout>
</template>

<script>
    import LoginForm from './LoginForm.vue';

    export default {

        data () {
            return {
              items: [
                {
                  src: '/src/assets/street.jpg'
                },
                {
                  src: '/src/assets/street.jpg'
                },
                {
                  src: '/src/assets/street.jpg'
                },
                {
                  src: '/src/assets/street.jpg'
                }
              ]
            }
        },
        components: {
            appLoginForm: LoginForm
        }
    }
</script>

<style lang="css">
</style>
