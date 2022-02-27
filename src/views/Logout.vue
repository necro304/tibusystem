<template>
    <div class="text-center mx-auto">
        <h1 class="mt-5">¿Estas seguro que quieres cerrar sesión?</h1>
        <v-btn dark color="red" @click="logout">
            Cerrar sesión
        </v-btn>
    </div>

</template>

<script>
import firebase from "firebase/app";
import {MESSAGE} from "@/plugins/alert";

export default {
  name: "Logout",
  methods: {
    logout() {
     firebase.auth().signOut().then(function() {
        this.$router.push("/");
      }).catch(function(error) {
       MESSAGE("Error", error.message, "error");
      });
    }
  }
}
</script>

<style scoped>

</style>