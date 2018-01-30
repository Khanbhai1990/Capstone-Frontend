<template lang="html">
  <div class="">
    <v-app id="inspire">
          <div>
            <v-layout row justify-left>
              <v-btn color="primary" dark @click.stop="dialog1 = true">Rate Your Day</v-btn>
              <v-dialog v-model="dialog1" max-width="500px">
                <v-card>
                  <v-card-title>
                    Dialog 1
                  </v-card-title>
                  <v-form v-model="valid" ref="form" lazy-validation>
                      <v-card-text>
                            <v-select
                              v-bind:items="items"
                              v-model="select"
                              label="A Select List"
                              item-value="text"
                            ></v-select>
                      </v-card-text>
                      <v-card-actions>
                          <v-btn color="primary" flat @click="rateSubmit">Submit</v-btn>
                          <v-btn color="primary" flat @click.stop="dialog1=false">Close</v-btn>
                      </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-layout>
          </div>
      </v-app>

  </div>

</template>

<script>
export default {
    data () {
        return {
            dialog1: false,
            select: null,
            valid:true,
            items: [
               { text: '1' },
               { text: '2' },
               { text: '3' },
               { text: '4' },
               { text: '5' }
            ]
        }
    },
    methods:{
      rateSubmit () {
       this.select = Number(this.select)
        this.dialog1 = false
        this.$emit('myrate', this.select);

      }
    }
  }
</script>

<style lang="css">
</style>
