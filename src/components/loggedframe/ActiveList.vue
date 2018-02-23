<template lang="html">
  <div class="">
      <v-app id="inspire">
        <div v-if="challenges.length">
          <h1>Active List</h1>
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
                    <router-link :to="`active/${chall.id}/${chall.challenge_id}/1`" style="text-decoration: none;"><v-btn flat color="green">Explore</v-btn></router-link>
                    <v-btn flat color="orange" @click="inactive(chall.id)">Deactivate</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
            </div>
        </div>
        <div v-else>
          <h1>There Are No Active Challenges :'(</h1>
        </div>
      </v-app>
  </div>
</template>

<script>

export default {
  data () {
    return {
      challenges:[],
      updated:0
    }
  },
  methods: {
    inactive(id){
      const formData = {
        active: false,
      }
        this.axios.patch(`http://localhost:8000/active_challenges/${id}`, formData)
          .then(res=>{
            console.log("patch works", res.data)
            //updated triggers "watch" which inturn re render the component
            this.updated++
          })
    }
  },
  watch: {
    updated: function (val){
      this.axios.get(`http://localhost:8000/active_challenges/user_chall/${this.$store.state.user.id}`)
        .then(res => {
          this.challenges = res.data.filter(challenge =>{
            return challenge.active === true
          })
          // console.log("this is data from active challenges", res.data)
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.axios.get(`http://localhost:8000/active_challenges/user_chall/${this.$store.state.user.id}`)
      .then(res => {
        this.challenges = res.data.filter(challenge =>{
          return challenge.active === true
        })
        // console.log("this is data from active challenges", res.data)
      })
      .catch(error => console.log(error))

      if (!this.$auth.check()) {
        this.$router.push('/')
      }
  }
}
</script>

<style lang="css">
</style>
