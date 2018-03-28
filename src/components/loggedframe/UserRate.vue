<template lang="html">
  <div class="">
        <form v-if="friendsData[0]" v-model="valid" lazy-validation>
          <v-layout row wrap>
          <v-flex xs12 md6>
            <h3>{{ friendsData[0].name.toUpperCase() }}</h3>
            <v-radio-group v-model="rowOne" column>
              <div v-for="number in numbers">
                    <v-radio :label="number" :value="number" ></v-radio>
              </div>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 md6>
            <h3>{{ friendsData[1].name.toUpperCase() }}</h3>
            <v-radio-group v-model="rowTwo" column>
                <div v-for="number in numbers">
                    <v-radio :label="number" :value="number" ></v-radio>
                </div>
            </v-radio-group>
          </v-flex>
          </v-layout>
          <v-btn @click="submit" color="primary" :disabled="!valid">submit</v-btn>
          <v-btn @click="clear" color="yellow" >clear</v-btn>
        </form>
  </div>

</template>

<script>
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
      props:["friendsData", "day"],
      methods: {
        submit () {
          console.log("this is the data", this.rowOne, this.rowTwo, this.$route.params.act_chall_id)
          const formDataOne = {
            user_id: this.$store.state.user.id,
            friend_id: this.friendsData[0].id,
            active_challenge_id: this.$route.params.act_chall_id,
            day_rate: this.day,
            rating: this.rowOne
          }
          const formDataTwo = {
            user_id: this.$store.state.user.id,
            friend_id: this.friendsData[1].id,
            active_challenge_id: this.$route.params.act_chall_id,
            day_rate: this.day,
            rating: this.rowTwo
          }


            // Native form submission is not yet supported
            this.axios.post('/user_rate', formDataOne)
              .then(res => {
                this.rowOne = null
              })
              .catch(error => console.log(error))

            this.axios.post('/user_rate', formDataTwo)
              .then(res => {
                this.rowTwo = null
              })
              .catch(error => console.log(error))
        },
        clear () {
          this.rowOne = null
          this.rowTwo = null

        }
      },
      created () {
        if (!this.$auth.check()) {
          this.$router.push('/')
        }
      }
}
</script>

<style lang="css">

</style>
