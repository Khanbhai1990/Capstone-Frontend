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
                                 ></v-text-field>
                               </v-flex>
                             </v-layout>
                           </v-container>
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
                        <v-btn color="primary" @click.native="e6 = 1">Next</v-btn>
                  </v-stepper-content>
            </v-stepper>
      </v-app>
</template>

<script>
import axios from 'axios';
import UserRate from './UserRate';
export default {
  data () {
    return {
     e6: 1,
     friendsData: null,
    }
  },
  props:["video","audio","instruct"],
  components: {
      appUserRate: UserRate
  },
  watch : {
    e6 : function() {

       if (this.e6===4){
         axios.get(`http://localhost:8000/user_rate/ranking/${this.$route.params.act_chall_id}`)
           .then(res => {
             this.friendsData = res.data.filter(user =>{
                return user.name !== this.$store.state.user.name
             })
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
