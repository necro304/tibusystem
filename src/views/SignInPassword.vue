<template>
  <div>
    <div class="text-center w-100">
      <h1 class="text-h5 mb-2">
        Bienvenido
      </h1>
      <v-chip
          class="mb-10"
          outlined
          link
          @click="$router.push({ name: 'signin' })"
      >
        <v-avatar left>
          <v-icon color="secondary">
            mdi-account-circle
          </v-icon>
        </v-avatar>
        {{ $route.params.email }}
        <v-avatar right>
          <v-icon color="secondary">
            mdi-chevron-down
          </v-icon>
        </v-avatar>
      </v-chip>

      <v-form >
        <v-text-field
            class="mb-10"
            :append-icon="show ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            label="Contraseña"
            name="password"
            :type="show ? 'input' : 'password'"
            hide-details="auto"
            v-model="password"
            outlined
            @click:append="show = !show"
        />
      </v-form>

      <div class="d-flex justify-space-between">
        <v-btn
            class="text-none letter-spacing-0 font-weight-bold"
            style="margin-left: -16px;"
            color="primary"
            text
            @click=""
        >
          ¿Olvidaste tu contraseña?
        </v-btn>
        <v-btn
            class="text-none"
            style="min-width: 88px;"
            color="primary"
            depressed
            @click="submit"
        >
          Entrar
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import {MESSAGE} from "@/plugins/alert";

export default {
  name: "SignInPassword",
  data () {
    return {
      show: false,
      password: '',
    }
  },
  methods: {
    submit () {

      firebase.auth().signInWithEmailAndPassword(this.$route.params.email, this.password)
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          let message = error.message;

          if (error.code === "auth/user-not-found") {
            message = "El usuario no existe";
          }

          if(error.code === "auth/wrong-password") {
            message = "La contraseña es incorrecta o el usuario no tiene una contraseña";
          }



          console.log(error)
          MESSAGE("Hay un problema", message, "error")
        })

    },
  },
}
</script>

<style scoped>

</style>