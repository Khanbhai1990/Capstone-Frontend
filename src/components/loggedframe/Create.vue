<template lang="html">
  <div class="">
    <h1>Create</h1>
    <v-app id="inspire">
        <div class="text-xs-center">
            <v-pagination :length="10" v-model="page"></v-pagination>
        </div>
        <div v-if="page == 1">
          <h2>Challenge</h2>
          <app-challenge-form  @challNumberFilled="challenge_id = $event"></app-challenge-form>
        </div>
        <h2>Day {{ page }} </h2>
        <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                name="instructions"
                label="Instructions of the Day"
                v-model="instructions"
                multi-line
              ></v-text-field>
              <v-text-field
                label="Youtube"
                v-model="youtube"
                :rules="nameRules"
                :counter="100"
              ></v-text-field>
              <v-text-field
                label="SoundCloud"
                v-model="soundCloud"
                :rules="nameRules"
              ></v-text-field>
              <v-text-field
                label="Image"
                v-model="image"
                :rules="nameRules"
              ></v-text-field>
              <v-checkbox
                label="Are you sure?"
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                required
              ></v-checkbox>

              <v-btn
                @click="daySubmit"
                :disabled="!valid"
              >
                submit
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
         </v-form>

    </v-app>
  </div>

</template>

<script>
import ChallengeForm from './ChallengeForm';
import axios from 'axios';
export default {
    data (){
      return {
        challenge_id: -1,
        page: 1,
        valid: true,
        youtube: '',
        soundCloud: '',
        image: '',
        instructions: '',
        nameRules: [
          (v) => !!v || 'Input is required',
          (v) => v && v.length <= 150|| 'Name must be less than 150 characters'
        ],
        textRules: [
          (v) => !!v || 'Input is required',
          (v) => v && v.length <= 1000|| 'Name must be less than 1000 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        checkbox: false
      }
    },
    methods: {
      daySubmit () {
        const formData = {
          challenge_id: this.challenge_id,
          day: this.page,
          video: this.youtube,
          audio: this.soundCloud,
          image: this.image,
          instructions: this.instructions
        }
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/features', formData)
            .then(res => {
              console.log("this is the response from features", res)
            })
            .catch(error => console.log(error))
        }
        this.$refs.form.reset()
        this.page++
      },
      clear () {
        this.$refs.form.reset()
      }
    },
      created () {
          if (!this.$store.state.token) {
            this.$router.push('/')
          }
      },
      components: {
          appChallengeForm: ChallengeForm
      }
}
</script>

<style lang="css">
</style>
