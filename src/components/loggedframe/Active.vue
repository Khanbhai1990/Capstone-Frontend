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
          videoId: "",
          audioUrl:""
        }
    },
    watch: {
      page: function(){
        console.log("this is auth status", this.$auth.check())
        axios.get(`http://localhost:8000/active_challenges/complete/${this.$route.params.chall_id}/${this.page}`)
          .then(res => {
            this.data = res.data
            this.videoId = this.$youtube.getIdFromURL(res.data[0].video)

          })
          .catch(error => console.log(error))
      }
    },
    created () {
      axios.get(`http://localhost:8000/active_challenges/complete/${this.$route.params.chall_id}/${this.page}`)
        .then(res => {
          this.data = res.data
          this.videoId = this.$youtube.getIdFromURL(res.data[0].video)
          this.audioUrl = res.data[0].audio

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
