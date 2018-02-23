<template lang="html">

      <v-app id="inspire">
            <v-stepper v-model="e6" vertical>
                  <v-stepper-step step="1" v-bind:complete="e6 > 1">
                        Feels
                        <small>Bare it all!</small>
                  </v-stepper-step>
                  <v-stepper-content step="1">
                        <v-card color="grey lighten-4" class="mb-5" height="300px">
                         <v-card-text>
                           <v-container fluid>
                             <v-layout row>
                               <v-flex xs12>
                                 <v-text-field
                                   name="input-1"
                                   label="How's It Goin?"
                                   textarea
                                   v-model="diary"
                                   class="diaryFont"
                                 ></v-text-field>
                               </v-flex>
                             </v-layout>
                           </v-container>

                         </v-card-text>
                       </v-card>
                        <v-btn color="green" @click.native="e6 = 2" @click="add(diary).then(()=> diary = '')">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="2" v-bind:complete="e6 > 2">Today's Summary</v-stepper-step>
                  <v-stepper-content step="2">
                        <v-card color="grey lighten-4" class="mb-5 styled" height="200px"><p style="line-height: 3; letter-spacing: 1px;">

                        {{ instruct }}</p></v-card>
                        <v-btn color="green" @click.native="e6 = 3">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="3" v-bind:complete="e6 > 3">Video of the Day</v-stepper-step>
                  <v-stepper-content step="3">
                        <v-card color="white lighten-4" class="mb-5" height="390px"><youtube :video-id="video"></youtube></v-card>
                        <v-btn color="green" @click.native="e6 = 4">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="4">Vibrations</v-stepper-step>
                  <v-stepper-content step="4">
                        <v-card color="white lighten-4" class="mb-5" height="250px"><span v-html="audio"></span></v-card>
                        <v-btn color="green" @click.native="e6 = 5">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="5">Rate Your Friends</v-stepper-step>
                  <v-stepper-content step="5">
                        <v-card color="grey lighten-4" class="mb-5" height="340px"><app-user-rate :friendsData="friendsData"></app-user-rate></v-card>
                        <v-btn color="green" @click.native="e6 = 6">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="6">Your Progress</v-stepper-step>
                  <v-stepper-content step="6">
                        <v-card color="white lighten-4" class="mb-5" height="500px"><app-graphs :ladder="e6"></app-graphs></v-card>
                        <v-btn color="green" @click.native="e6 = 1">Next</v-btn>
                  </v-stepper-content>
            </v-stepper>
      </v-app>
</template>

<script>
import {mapActions} from 'vuex';
import UserRate from './UserRate';
import Graphs from './Graphs';
export default {
  data () {
    return {
     e6: 1,
     friendsData: [],
     diary:"",
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
        console.log(this.instruct)
       if (this.e6===5){
         this.axios.get(`http://localhost:8000/user_rate/ranking/${this.$route.params.act_chall_id}`)
           .then(res => {
             this.friendsData = res.data.filter(user =>{
                return user.name !== this.$store.state.user.name
             })
           })
           .catch(error => console.log(error))

           if (!this.$auth.check()) {
             this.$router.push('/')
           }
       }
    }
  }
}
</script>

<style lang="css" scoped>
@font-face {
    font-family: 'Indie Flower', cursive;
    font-family: 'Adamina', serif;
    src: url('https://fonts.googleapis.com/css?family=Adamina|Indie+Flower');
}

.diaryFont{
  font-family: 'Indie Flower', cursive;
}
.styled{
  font-family: 'Adamina', serif;
}

</style>
