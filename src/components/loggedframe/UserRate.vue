<template lang="html">
  <div class="">
        <form v-model="valid" lazy-validation>
          <v-layout row wrap>
          <v-flex xs12 md6>
            <v-subheader>{{ friendsData[0].name }}</v-subheader>
            <v-radio-group v-model="rowOne" column>
              <div v-for="number in numbers">
                    <v-radio :label="number" :value="number" ></v-radio>
              </div>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 md6>
            <v-subheader>{{ friendsData[1].name }}</v-subheader>
            <v-radio-group v-model="rowTwo" column>
                <div v-for="number in numbers">
                    <v-radio :label="number" :value="number" ></v-radio>
                </div>
            </v-radio-group>
          </v-flex>
          </v-layout>
          <v-btn @click="submit" :disabled="!valid">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>]
  </div>

</template>

<script>
import axios from 'axios';
export default {
      data () {
        return {
          rowOne: null,
          rowTwo: null,
          valid: true,
          numbers: ["1","2","3","4","5"],
          numbersTwo: ["1","2","3","4","5"],
          data: null

        }
      },
      props:["friendsData"],
      methods: {
        submit () {
          console.log("this is the data", this.rowOne, this.rowTwo, this.$route.params.act_chall_id)
          const formDataOne = {
            user_id: this.$store.state.user.id,
            friend_id: this.friendsData[0].id,
            active_challenge_id: this.$route.params.act_chall_id,
            day_rate: this.$route.params.day,
            rating: this.rowOne
          }
          const formDataTwo = {
            user_id: this.$store.state.user.id,
            friend_id: this.friendsData[1].id,
            active_challenge_id: this.$route.params.act_chall_id,
            day_rate: this.$route.params.day,
            rating: this.rowTwo
          }

            console.log("bitch is validated")
            // Native form submission is not yet supported
            axios.post('/user_rate', formDataOne)
              .then(res => {
                console.log("this is the response from userOne", res)
              })
              .catch(error => console.log(error))

              axios.post('/user_rate', formDataTwo)
                .then(res => {
                  console.log("this is the response from userTwo", res)
                })
                .catch(error => console.log(error))
        },
        clear () {
          this.rowOne = null
          this.rowTwo = null

        }
      }
}
</script>

<style lang="css">
</style>
