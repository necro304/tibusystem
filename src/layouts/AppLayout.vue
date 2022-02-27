<template>
  <div >
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">

        <v-btn
            class="mr-3"
            icon
            @click="drawer = !drawer"
        >
          <v-icon
          >
            mdi-menu
          </v-icon>
        </v-btn>

        <div>Tibusystem</div>
      </div>
    </v-app-bar>
    <v-content   style="min-height: 100vh;">
      <Drawer :open.sync="drawer"   :items="items"/>
      <v-container fluid>
        <v-layout
            row
            wrap
            align-center
            justify-center
        >
          <v-flex xs12 sm12 md12 lg12 xl12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Drawer from "@/components/Drawer";

export default {
  name: "AppLayout",
  components:{
    Drawer,
  },
  data () {
    return {
      drawer: false,
      items: [
        {
          text: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/home'
        },
        {
          text: 'Clientes',
          icon: 'mdi-account-multiple',
          to: '/customers'
        },

        {
          text: 'Logout',
          icon: 'mdi-logout',
          to: '/logout'
        }
      ]
    }
  },

}
</script>

<style scoped>

</style>