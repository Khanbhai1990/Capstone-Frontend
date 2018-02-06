<template lang="html">
  <div class="">
        <form v-model="valid" lazy-validation>
          <v-layout row wrap>
          <v-flex xs12 md6>
            <h2>Rate Your Day</h2>
            <v-radio-group v-model="rowOne" row>
              <div v-for="number in numbers">
                <div class="radioclass">
                    <v-radio :label="number" :value="number"></v-radio>
                </div>
              </div>
            </v-radio-group>
          </v-flex>
          </v-layout>
          <h3>{{ trackName.toUpperCase() }} {{ "tracker".toUpperCase() }}</h3>
          <v-text-field
            :label="'##'"
            v-model="track"
            :counter="10"
            type="number"
          ></v-text-field>
          <v-btn @click="rateSubmit" color="primary" :disabled="!valid">submit</v-btn>
          <v-btn @click="clear" color="yellow">clear</v-btn>
        </form>
  </div>

</template>

<script>
// import {mapGetters} from 'vuex';
import axios from "axios"
export default {
    data () {
        return {
          rowOne: null,
          valid: true,
          numbers: ["1","2","3","4","5"],
          data: null,
          track:null
        }
    },
    props: ["trackName"],
    methods:{
      rateSubmit () {
          const formData = {
            user_id: this.$store.state.user.id,
            active_challenge_id: this.$route.params.act_chall_id,
            diary: this.$store.state.diaryData,
            day_input: this.$route.params.day,
            self_rate: this.rowOne,
            tracker: this.track
          }
          axios.post('/user_input', formData)
            .then(res => {
              console.log("this is the response from features", res)
            })
            .catch(error => console.log(error))
      },
      clear () {
        this.rowOne = null

      }
       //  console.log("diary in dialog",  this.$store.state.diaryData)
       // this.rowOne = Number(this.rowOne)
        // this.$emit('myrate', this.rowOne);

      },
      created (){
        if (!this.$auth.check()) {
          this.$router.push('/')
        }
      }

  }
</script>

<style lang="css" scoped="">
  .radioclass{
    width: 50px;
  }
</style>
