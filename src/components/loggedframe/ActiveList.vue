<template lang="html">
  <div class="">
      <v-app id="inspire">
        <div v-if="challenges.length">
          <h1>Active List Tab</h1>
          <div v-for="chall in challenges">
            <v-layout class="mb-4 mt-4" >
              <v-flex xs12 sm6 offset-sm2>
                <v-card>
                  <v-card-media :src="chall.paralax" height="200px">
                  </v-card-media>
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ chall.challenge}}</h3>
                      <div>{{ chall.description }}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="orange">Deactivate
                    </v-btn>
                    <router-link :to="`active/${chall.id}/${chall.challenge_id}/1`"><v-btn flat color="orange">Explore</v-btn></router-link>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
            </div>
        </div>
        <div v-else>
          <h1>There Are No Active Challenges</h1>
        </div>
      </v-app>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      challenges: []
    }
  },
  computed: {
  },
  created () {
    axios.get(`http://localhost:8000/active_challenges/user_chall/${this.$store.state.user.id}`)
      .then(res => {
        this.challenges = res.data
        console.log(res.data)
      })
      .catch(error => console.log(error))

    if (!this.$store.state.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
