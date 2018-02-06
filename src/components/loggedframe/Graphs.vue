<template lang="html">
  <pie-chart :data="accum"></pie-chart>
</template>

<script>
import axios from "axios"
export default {
  data (){
    return {
      accum: [],
      totalData: [],
      once:0
    }
  },
  props:["ladder"],
  watch: {
    ladder: function (){

          if (this.ladder ===6 && this.once ===0 ){
            this.once++
            axios.get(`http://localhost:8000/user_rate/ranking/${this.$route.params.act_chall_id}`)
              .then(res => {
                this.totalData = res.data


                  for (let i =0;i<=2;i++){
                    axios.get(`http://localhost:8000/user_rate/acc/${this.$route.params.act_chall_id}/${this.totalData[i].id}`)
                    .then(num => {
                      this.accum.push([this.totalData[i].name , Number(num.data[0].sum)])

                    })
                    .catch(error => console.log(error))
                    }


              })
              .catch(error => console.log(error))

          }

    }

  },
  created(){
    if (!this.$auth.check()) {
      this.$router.push('/')
    }
  }

}
</script>

<style lang="css">
</style>
