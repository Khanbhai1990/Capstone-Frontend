<template lang="html">
  <div class="">
        <form v-model="valid" lazy-validation>
          <v-layout row wrap>
          <v-flex xs12 md6>
            <h2>Rate Your Day</h2>
            <v-radio-group v-model="rowOne" row>
              <div v-for="number in numbers">
                <div class="radioclass">
                    <v-radio :label="number" :value="number" ></v-radio>
                </div>
              </div>
            </v-radio-group>
          </v-flex>
          </v-layout>
          <v-btn @click="rateSubmit" :disabled="!valid">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
  </div>

</template>

<script>
// import {mapGetters} from 'vuex';
export default {
    data () {
        return {
          rowOne: null,
          valid: true,
          numbers: ["1","2","3","4","5"],
          data: null
        }
    },
    methods:{
      rateSubmit () {
        console.log("diary in dialog",  this.$store.state.diaryData)
       this.rowOne = Number(this.rowOne)
        this.$emit('myrate', this.rowOne);

      },
      clear () {
        this.rowOne = null

      }
    }
  }
</script>

<style lang="css" scoped="">
  .radioclass{
    width: 50px;
  }
</style>
