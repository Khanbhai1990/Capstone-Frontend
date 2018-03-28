<template lang="html">
<div class="">
  <v-app id="inspire">

    <v-parallax v-if="data[0]" :src="data[0].paralax" height="400"></v-parallax>
    <div class="text-xs-center">
      <v-pagination :length="10" v-model="page"></v-pagination>
        <app-content v-if="data[0]" :user_input="inputData.diary" :video="videoId" :audio="audioUrl" :instruct="data[0].instructions" :day="page"></app-content>
    </div>
  </v-app>
  <app-dialog v-if="data[0]" class="box" @myrate="myRate = $event" :trackName="data[0].tracker_name" :self_rate="inputData.self_rate" :tracker_value="inputData.tracker" :day="page"></app-dialog>



</div>
</template>

<script>
import Content from './Content';
import Dialog from './Dialog';
// import UserRate from './UserRate';

export default {
    data () {
        return {
          data: [],
          myRate:5,
          active_id: this.$route.params.act_chall_id,
          chall_id: this.$route.params.chall_id,
          page: Number(this.$route.params.day),
          days:[0,60,60*2,60*3,60*4,60*5,60*6,60*7,60*8,60*9],
          fil:null,
          videoId: "",
          audioUrl:"",
          inputData:{diary:"", tracker: "", self_rate:null}
        }
    },
    watch: {
      page: function(){
        this.axios.get(`http://localhost:8000/active_challenges/complete/${this.$route.params.chall_id}/${this.page}/${this.$route.params.act_chall_id}`)
          .then(res => {
            this.data = res.data
            this.videoId = this.$youtube.getIdFromURL(res.data[0].video)
            this.fil = 10 - this.days.filter(num => num > Date.now().toString().slice(0,10)-res.data[0].startTime).length;

            if(this.page>this.fil){
              alert(`content for day ${this.page} will be available when the time is right :-) (access to the next day in a minute)`)
              this.page = this.fil
            }
          })
          .catch(error => console.log(error))

        this.axios.get(`http://localhost:8000/user_input/${this.$route.params.act_chall_id}/${this.$store.state.user.id}/${this.page}`)
            .then(res => {
              if (res.data[0]){
              this.inputData = res.data[0]
            } else {
              this.inputData = {diary:"", tracker: "", self_rate:null}
            }

            })
            .catch(error => console.log(error))

      }
    },
    created () {
        this.axios.get(`http://localhost:8000/active_challenges/complete/${this.$route.params.chall_id}/${this.page}/${this.$route.params.act_chall_id}`)
            .then(res => {
              this.data = res.data
              this.videoId = this.$youtube.getIdFromURL(res.data[0].video)
              this.audioUrl = res.data[0].audio
              this.fil = 10 - this.days.filter(num => num > Date.now().toString().slice(0,10)-res.data[0].startTime).length;

            })
            .catch(error => console.log(error))

        this.axios.get(`http://localhost:8000/user_input/${this.$route.params.act_chall_id}/${this.$store.state.user.id}/${this.page}`)
            .then(res => {
              if (res.data[0]){
              this.inputData = res.data[0]
            }

            })
            .catch(error => console.log(error))

      if (!this.$auth.check()) {
        this.$router.push('/')
      }
    },
    components: {
        appContent: Content,
        appDialog: Dialog
        // appUserRate: UserRate
    }
}
</script>

<style lang="css" scoped>

</style>
