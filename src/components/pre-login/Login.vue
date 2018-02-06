<template lang="html">
  <v-layout row wrap>
    <v-flex d-flex xs12 sm6 md6>
        <v-card color="" dark>
          <v-card-title primary class="title">ChallengeUP</v-card-title>
          <v-card-text>
            Project Ten is an application that provides the user a template to create challenges
            lasting ten days. The challenges can then be shared with the user’s friends(online or in real life)
            and family. The challenges could be related to health and well being, or something trivial (like binge watching all Marvel movies for ten days straight!).
            It’s completely up to users to come up with the content; sky’s the limit.
             <br> <br> <br> <br> <br> <br> <br> <br>
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
                  src: '/src/assets/1401783920.jpg'
                },
                {
                  src: '/src/assets/team.jpg'
                },
                {
                  src: '/src/assets/faculty-meeting.png'
                }
              ]
            }
        },
        components: {
            appLoginForm: LoginForm
        },
        created(){
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
        }
    }
</script>

<style lang="css">
</style>
