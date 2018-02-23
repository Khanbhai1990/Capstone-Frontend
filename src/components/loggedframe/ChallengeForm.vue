<template lang="html">
  <div class="">
    <h2>Challenge {{ title }}</h2>
    <div v-if="!title">
        <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="Challenge Name"
              v-model="challName"
              :rules="nameRules"
              :counter="100"
            ></v-text-field>
            <v-text-field
              label="Challenge Description"
              v-model="challDes"
              :rules="nameRules"
              :counter="100"
            ></v-text-field>
            <v-text-field
              label="Cover Photo"
              v-model="coverPhoto"
              :rules="coverRules"
              :counter="100"
            ></v-text-field>
            <v-text-field
              label="Tracker"
              v-model="trackerName"
              :rules="nameRules"
              :counter="100"
            ></v-text-field>
            <v-checkbox
              label="Are you sure?"
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              required
            ></v-checkbox>

            <v-btn
              color="blue"
              @click="challSubmit"
              :disabled="!valid"
            >
              submit
            </v-btn>
            <v-btn color="yellow" @click="clear">clear</v-btn>
          </v-form>
      </div>
  </div>

</template>

<script>
    export default {
        data (){
          return {
            valid: true,
            hide:false,
            title: "",
            challName: '',
            challDes: '',
            coverPhoto: '',
            trackerName:'',
            nameRules: [
              (v) => !!v || 'Input is required',
              (v) => v && v.length <= 40 || 'Name must be less than 40 characters'
            ],
            coverRules: [
              (v) => !!v || 'Input is required',
              (v) => v && v.length <= 150  || 'Name must be less than 150 characters'
            ],
            // email: '',
            // emailRules: [
            //   (v) => !!v || 'E-mail is required',
            //   (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            // ],
            checkbox: false
          }
        },
        props: {
            theChallenge: {
                type: Number
            }
        },
        methods: {
          challSubmit () {
            this.hide=true
            this.title = this.challName
            const formData = {
              challenge: this.challName,
              description: this.challDes,
              user_id: this.$store.state.user.id,
              paralax: this.coverPhoto,
              tracker_name: this.trackerName
            }
            if (this.$refs.form.validate()) {
              // Native form submission is not yet supported
              this.axios.post('/challenges', formData)
                .then(res => {
                  console.log("this is the response", res.data[res.data.length-1].id)
                  this.theChallenge = res.data[res.data.length-1].id
                  this.$emit('challNumberFilled', this.theChallenge);
                })
                .catch(error => console.log(error))
            }
          },
          clear () {
            this.$refs.form.reset()
          }
        },
        created  (){
          if (!this.$auth.check()) {
            this.$router.push('/')
          }
        }
    }
</script>

<style lang="css">
</style>
