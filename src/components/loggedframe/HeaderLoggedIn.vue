<template>
  <div color="grey darken-1">
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <div class="" v-if="item.link != 'home'" :click="logout">
                  <router-link :to="{ name: item.link}" tag="li">{{ item.text }}</router-link>
                </div>
                <div class="">
                  <a href="http://localhost:8080/"><li>{{ item.text }}</li></a>
                </div>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
      <v-content>
          <v-toolbar color="blue darken-3" darkapp clipped-left fixed>
            <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
                  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                  <span class="hidden-xs-only white--text" style="padding:10px;">ChallengeUP</span>
            </v-toolbar-title>
            <!-- <div v-if="$route.path == '/search' ">
              <v-text-field
                      light
                      solo
                      prepend-icon="search"
                      placeholder="Search"
                      style="max-width: 500px; min-width: 128px">
              </v-text-field>
            </div> -->
            <div class="d-flex align-center" style="margin-left: auto">
                <v-btn icon>
                    <v-icon>apps</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>notifications</v-icon>
                </v-btn>
                <v-btn icon large>
                    <v-avatar size="20px" tile>
                          <img
                            src="https://vuetifyjs.com/static/doc-images/logo.svg"
                            alt="Vuetify"
                          >
                    </v-avatar>
                </v-btn>
            </div>
          </v-toolbar>
      </v-content>
  </div>

</template>

<script>

    export default {
        data () {
          return {
          dialog: false,
          drawer: null,
          items: [
                    { icon: 'explore', text: 'Explore', link: 'Search' },
                    { icon: 'lightbulb_outline', text: 'Active List', link: 'ActiveList' },
                    { icon: 'history', text: 'My Challenges', link: 'My Challenges' },
                    { icon: 'content_copy', text: 'Create', link: 'Create'},
                    { icon: 'remove_circle', text: 'LogOut', link: 'home' }
                  ]
                }
         },
        computed: {
          logout(){
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
          }
        }


    }
</script>

<style lang="css" scoped>
    a { color:inherit;
        text-decoration: none;
      }
</style>
