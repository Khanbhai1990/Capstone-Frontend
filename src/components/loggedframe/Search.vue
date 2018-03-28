<template lang="html">
  <div class="">
    <v-layout row justify-center>
    </v-layout>
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
                  <v-list-tile avatar ripple v-bind:key="index" @click="logIt(challenge.id)" >
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
          <div v-if="dialog">
              <v-card>
                <v-card-title>
                  <span class="headline">User Profile</span>
                </v-card-title>
                <v-card-text>
                      <v-container grid-list-md>
                          <v-layout wrap>
                              <v-flex xs12 sm12>
                                  <v-select
                                  label="Friends"
                                  v-model="friendsArr"
                                  multiple
                                  autocomplete
                                  chips
                                  v-bind:disabled="friendsArr.length>=2"
                                  :items="usersData"
                                  item-text="name"
                                  item-value="id"
                                  ></v-select>
                              </v-flex>
                          </v-layout>
                      </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary"  @click.native="funcSelected">Activate</v-btn>
                  <v-btn color="yellow"  @click.native="funcClose">Close</v-btn>
                </v-card-actions>
              </v-card>
          </div>
        </v-layout>
    </v-app>
  </div>
</template>

<script>
export default {
  data () {
    return {
      challenges: [],
      friendsArr:[],
      usersData:[],
      dialog:false,
      // challengesNames:[],
      filterText:'',
      selectedChallId:""
    }
  },
  methods: {
      logIt(id){
        this.selectedChallId = id
        this.dialog = !this.dialog
      },
      funcSelected () {
        console.log("funcSelected works!")
        const formData = {
          userOne_id: this.$store.state.user.id,
          userTwo_id: this.friendsArr[0],
          userThree_id: this.friendsArr[1],
          challenge_id: this.selectedChallId,
          active: true,
          startTime: Date.now().toString().slice(0,10)
        }

          this.axios.post('/active_challenges', formData)
            .then(res => {
              console.log("this is the response from features", res)
            })
            .catch(error => console.log(error))

          this.dialog=!this.dialog
          this.friendsArr = []

      },
      funcClose(){
        this.dialog = false
        this.friendsArr = []
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
    this.axios.get(`http://localhost:8000/challenges`)
      .then(res => {
        this.challenges = res.data
        console.log(res.data)
      })
      .catch(error => console.log(error))

    this.axios.get('http://localhost:8000/auth/users')
      .then(res => {
        this.usersData = res.data.filter(user =>{
          return user.id !== this.$store.state.user.id

        })

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
