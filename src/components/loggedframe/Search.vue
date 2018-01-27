<template lang="html">
  <div class="">
    <v-app id="inspire">
        <v-layout row>
          <v-flex xs12 sm6 offset-sm0>
            <v-card>
              <v-toolbar color="blue" dark>
                  <v-toolbar-title>Explore</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-text-field
                      v-model="filterText"
                      light
                      solo
                      prepend-icon="search"
                      placeholder="Search"
                      style="max-width: 500px; min-width: 128px">
                  </v-text-field>
                  <v-btn icon>
                    <v-icon>check_circle</v-icon>
                  </v-btn>
              </v-toolbar>
              <v-list two-line>
                <template v-for="(challenge, index) in filterArr">
                  <v-list-tile avatar ripple v-bind:key="index" @click="">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ challenge.challenge }}</v-list-tile-title>
                      <!-- <v-list-tile-sub-title class="grey--text text--darken-4">{{ challenge.description }}</v-list-tile-sub-title> -->
                      <v-list-tile-sub-title>{{ challenge.description }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-list-tile-action-text>{{ challenge.created_at.substring(0, 10)}}</v-list-tile-action-text>
                      <v-avatar size="40px" slot="activator">
                          <img :src="challenge.paralax" alt="">
                      </v-avatar>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider v-if="index + 1 &lt; challenges.length"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      challenges: [],
      // challengesNames:[],
      filterText:''
    }
  },
  computed: {
    filterArr(){
      return this.challenges.filter((obj)=>{
        let text = obj.challenge.toUpperCase()
        return text.match(this.filterText.toUpperCase())
      })
    }

  },
  created () {
    axios.get(`http://localhost:8000/challenges`)
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
