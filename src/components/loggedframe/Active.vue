<template lang="html">

  <v-app id="inspire">

    <v-parallax :src="data[0].paralax" height="400"></v-parallax>
    <div class="text-xs-center">
      <v-pagination :length="10" v-model="page"></v-pagination>
        <app-content :video="videoId" :audio="test" :instruct="data[0].instructions"></app-content>
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

  </v-app>
</template>

<script>
import axios from 'axios';
import Content from './Content';

export default {
    data () {
        return {
          data: [],
          active_id: this.$route.params.act_chall_id,
          chall_id: this.$route.params.chall_id,
          page: Number(this.$route.params.day),
          videoId: "",
          audioUrl:"",
          test: '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/68276792&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe>'
        }
    },
    methods: {
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
          console.log("this is data from Active", res.data)
        })
        .catch(error => console.log(error))


      if (!this.$store.state.token) {
        this.$router.push('/')
      }
    },
    components: {
        appContent: Content
    }
}
</script>

<style lang="css" scoped>
  .box{
    height: 100px;
    width: 39%;
  }
</style>
