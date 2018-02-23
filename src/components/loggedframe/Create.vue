<template lang="html">
  <div class="">
    <v-app id="inspire">
        <div class="text-xs-center">
            <v-pagination :length="10" v-model="page"></v-pagination>
        </div>
        <div>
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
                label="Youtube (http link with video ID only)"
                v-model="youtube"
                :rules="nameRules"
                :counter="100"
              ></v-text-field>
              <v-text-field
                label="SoundCloud (only embedded code with iframe tags)"
                v-model="soundCloud"
                :rules="textRules"
              ></v-text-field>
              <v-text-field
                label="Meme of the Day (img)"
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
                color="blue"
                @click="daySubmit"
                :disabled="!valid"
              >
                submit
              </v-btn>
              <v-btn color="yellow" @click="clear">clear</v-btn>
         </v-form>

    </v-app>
  </div>

</template>

<script>
import ChallengeForm from './ChallengeForm';
export default {
    data (){
      return {
        challenge_id:null,
        page: 1,
        valid: true,
        youtube: '',
        soundCloud: '',
        image: '',
        instructions: '',

        nameRules: [
          (v) => !!v || 'Input is required',
          (v) => v && v.length <= 2000|| 'Name must be less than 150 characters'
        ],
        textRules: [
          (v) => !!v || 'Input is required',
          (v) => v && v.length <= 2000|| 'Name must be less than 1000 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        checkbox: false,
        trackerObj: {},
        trackerId:null
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
          if(this.trackerObj[this.page.toString()]){
            this.axios.patch(`/features/${this.trackerObj[this.page.toString()]}`, formData)
              .then(res =>{
                console.log("this is patch", res)
                this.page++
              })
              .catch(error => console.log(error))
          } else{
            this.axios.post('/features', formData)
              .then(res => {
                console.log("this is the response from features", res, this.page)
                this.trackerObj[this.page.toString()] = res.data[this.page-1].id
                this.page++
                console.log("this is the obj", this.trackerObj)
              })
              .catch(error => console.log(error))
          }




        }
        this.$refs.form.reset()

      },
      clear () {
        this.$refs.form.reset()
      }
    },
      created () {
        if (!this.$auth.check()) {
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
