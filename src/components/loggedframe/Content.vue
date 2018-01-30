<template lang="html">

      <v-app id="inspire">
            <v-stepper v-model="e6" vertical>
                  <v-stepper-step step="1" v-bind:complete="e6 > 1">
                        Feels
                        <small>Bare it all!</small>
                  </v-stepper-step>
                  <v-stepper-content step="1">
                        <v-card color="blue lighten-4" class="mb-5" height="300px">
                         <v-card-text>
                           <v-container fluid>
                             <v-layout row>
                               <v-flex xs12>
                                 <v-text-field
                                   name="input-1"
                                   label="How's It Goin?"
                                   textarea
                                   v-model="diary"
                                 ></v-text-field>
                               </v-flex>
                             </v-layout>
                           </v-container>
                           <button class="btn btn-primary" @click="add(diary).then(()=> diary = '')">Submit</button>
                         </v-card-text>
                       </v-card>
                        <v-btn color="primary" @click.native="e6 = 2">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="2" v-bind:complete="e6 > 2">Today's Summary</v-stepper-step>
                  <v-stepper-content step="2">
                        <v-card color="blue lighten-4" class="mb-5" height="200px">{{ instruct }}</v-card>
                        <v-btn color="primary" @click.native="e6 = 3">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="3" v-bind:complete="e6 > 3">Video of the Day</v-stepper-step>
                  <v-stepper-content step="3">
                        <v-card color="blue lighten-4" class="mb-5" height="390px"><youtube :video-id="video"></youtube></v-card>
                        <v-btn color="primary" @click.native="e6 = 4">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="4">Vibrations</v-stepper-step>
                  <v-stepper-content step="4">
                        <v-card color="blue lighten-4" class="mb-5" height="250px"><span v-html="audio"></span></v-card>
                        <v-btn color="primary" @click.native="e6 = 5">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="5">Rate Your Friends</v-stepper-step>
                  <v-stepper-content step="5">
                        <v-card color="blue lighten-4" class="mb-5" height="340px"><app-user-rate :friendsData="friendsData"></app-user-rate></v-card>
                        <v-btn color="primary" @click.native="e6 = 6">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="6">Your Progress</v-stepper-step>
                  <v-stepper-content step="6">
                        <v-card color="blue lighten-4" class="mb-5" height="500px"><app-graphs :totalData="totalData"></app-graphs></v-card>
                        <v-btn color="primary" @click.native="e6 = 1">Next</v-btn>
                  </v-stepper-content>
            </v-stepper>
      </v-app>
</template>

<script>
import axios from 'axios';
import {mapActions} from 'vuex';
import UserRate from './UserRate';
import Graphs from './Graphs';
export default {
  data () {
    return {
     e6: 1,
     friendsData: [],
     totalData: [],
     diary:""
    }
  },
  methods: {
    ...mapActions({
        add: "diary_content"
    })
  },
  props:["video","audio","instruct"],
  components: {
      appUserRate: UserRate,
      appGraphs: Graphs
  },
  watch : {
    e6 : function() {

       if (this.e6===4){
         axios.get(`http://localhost:8000/user_rate/ranking/${this.$route.params.act_chall_id}`)
           .then(res => {
             this.friendsData = res.data.filter(user =>{
                return user.name !== this.$store.state.user.name
             })
             this.totalData = res.data
           })
           .catch(error => console.log(error))

         if (!this.$store.state.token) {
           this.$router.push('/')
         }
       }
    }
  }
}
</script>

<style lang="css" scoped>

</style>
