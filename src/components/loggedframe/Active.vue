<template lang="html">
  <div class="">
    <h3>Active Tab</h3>
    <p>Hello {{ name }}!</p>
  </div>

</template>

<script>
    import axios from 'axios';

    export default {
        data () {
          return {
            name: this.$store.state.user.name
          }
        },
        created () {
          if (!this.$store.state.token) {
            this.$router.push('/')
          }
            // axios.get('/users')
            //   .then(res => {
            //       console.log(res)
            //       const data = res.data
            //       const users = []
            //       for (let key in data){
            //         const user = data[key]
            //         // user.id = key
            //         users.push(user)
            //       }
            //       console.log("these are users object", users)
            //       this.name = users[0].name
            //   })
            //   .catch(error => console.log(error))
        }
    }
</script>

<style lang="css">
</style>
