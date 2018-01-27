<template>
  <v-content>
    <v-toolbar
  color="blue darken-3"
  dark
  app
  clipped-left
  fixed
>
  <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">

    <span class="hidden-xs-only white--text" style="padding:10px;">Project Ten </span>
  </v-toolbar-title>
  <div class="d-flex align-center" style="margin-left: auto">
    <v-btn icon>
      <v-icon>apps</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>
    <v-btn icon large>
      <v-avatar size="32px" tile>
        <img
          src="https://vuetifyjs.com/static/doc-images/logo.svg"
          alt="Vuetify"
        >
      </v-avatar>
    </v-btn>
  </div>
</v-toolbar>
  </v-content>

</template>

<script>
    export default {
        methods: {
          data () {
            return {
              routing: "test"
            }
          }
            // increment() {
            //     this.$emit('updated', 1);
            // },
            // decrement() {
            //     this.$emit('updated', -1);
            // }
        }
    }
</script>
