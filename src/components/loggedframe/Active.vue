<template lang="html">
<div class="">
  <v-app id="inspire">

    <v-parallax :src="data[0].paralax" height="400"></v-parallax>
    <div class="text-xs-center">
      <v-pagination :length="10" v-model="page"></v-pagination>
        <app-content :video="videoId" :audio="audioUrl" :instruct="data[0].instructions"></app-content>

    <!-- <h3>{{data[0].challenge}}</h3><br><br>
    <h3>Instructions</h3>
      <p>  {{ data[0].instructions }}</p>

      <h3>Video of the Day</h3>
      <youtube :video-id="videoId"></youtube>
      <h3>Audio of the Day</h3>

        <span v-html="test"></span>

      <div class="box">

      </div> -->
    </div>
    <!-- <app-user-rate></app-user-rate> -->
  </v-app>
  <app-dialog class="box" @myrate="myRate = $event"></app-dialog>



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

      if (!this.$store.state.token) {
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
