<template lang="html">
  <div id="app">
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
                        <v-card color="grey lighten-1" class="mb-5" height="200px">{{ instruct }}</v-card>
                        <v-btn color="primary" @click.native="e6 = 3">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="3" v-bind:complete="e6 > 3">Video of the Day</v-stepper-step>
                  <v-stepper-content step="3">
                        <v-card color="grey lighten-1" class="mb-5" height="390px"><youtube :video-id="video"></youtube></v-card>
                        <v-btn color="primary" @click.native="e6 = 4">Next</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="4">Vibrations</v-stepper-step>
                  <v-stepper-content step="4">
                        <v-card color="grey lighten-1" class="mb-5" height="250px"><span v-html="audio"></span></v-card>
                        <v-btn color="primary" @click.native="e6 = 1">Done</v-btn>
                  </v-stepper-content>
            </v-stepper>
      </v-app>
</div>
</template>

<script>

export default {
  data () {
    return {
     e6: 1
    }
  },
  props:["video","audio","instruct"]
}
</script>

<style lang="css">
</style>
