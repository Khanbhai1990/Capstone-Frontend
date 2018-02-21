<template lang="html">
<div class="">
  <v-app id="inspire">

    <v-parallax :src="data[0].paralax" height="400"></v-parallax>
    <div class="text-xs-center">
      <v-pagination :length="10" v-model="page"></v-pagination>
        <app-content :video="videoId" :audio="audioUrl" :instruct="data[0].instructions"></app-content>
    </div>
  </v-app>
  <app-dialog class="box" @myrate="myRate = $event" :trackName="data[0].tracker_name"></app-dialog>



</div>
</template>

<script>
import axios from 'axios';
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
          days:[0,86400,86400*2,86400*3,86400*4,86400*5,86400*6,86400*7,86400*8,86400*9],
          fil:null,
          videoId: "",
          audioUrl:""
        }
    },
    watch: {
      page: function(){
        if(this.page>this.fil){
          alert(`content for day ${this.page} will be available when the time is right :-) (access to the next day will be permitted after 24 hours)`)
          this.page = this.fil
        }
        axios.get(`http://localhost:8000/active_challenges/complete/${this.$route.params.chall_id}/${this.page}/${this.$route.params.act_chall_id}`)
          .then(res => {
            this.data = res.data
            this.videoId = this.$youtube.getIdFromURL(res.data[0].video)
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      axios.get(`http://localhost:8000/active_challenges/complete/${this.$route.params.chall_id}/${this.page}/${this.$route.params.act_chall_id}`)
        .then(res => {
          this.data = res.data
          this.videoId = this.$youtube.getIdFromURL(res.data[0].video)
          this.audioUrl = res.data[0].audio
          this.fil = 10 - this.days.filter(num => num > Date.now().toString().slice(0,10)-res.data[0].startTime).length;

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
