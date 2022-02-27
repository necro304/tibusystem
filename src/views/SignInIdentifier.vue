<template>
  <div>
    <div class="text-center">
      <h1 class="headline mb-2">
        Ingresar
      </h1>
      <span class="d-inline-block mb-8">Usa tu cuenta de Tibusystem</span>
    </div>

    <v-form @submit.prevent="next">
      <v-text-field
          ref="input"
          v-model="email"
          class="mb-2"
          label="Correo electrónico"
          name="login"
          type="text"
          hide-details="auto"
          outlined
          :disabled="disabled"
          :error-messages="error"
      />
    </v-form>

    <div class="text-body-2 text--secondary mb-8">
      ¿No es tu computadora? Utilice una ventana privada para iniciar sesión.
      <a
          href="#"
          class="d-inline-block text-none text-decoration-none font-weight-bold"
      >Leer mas</a>
    </div>
    <div class="d-flex justify-space-between">
      <v-btn
          class="text-none letter-spacing-0"
          style="margin-left: -16px;"
          color="primary"
          text
          @click="$router.push({ name: 'signup' })"
      >
        Registrarse
      </v-btn>
      <v-btn
          class="text-none"
          style="min-width: 88px;"
          color="primary"
          depressed
          @click="next"
      >
        Siguiente
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignInIdentifier",
  data: () => ({
    error: null,
    disabled: false,
    email: null,
  }),
  methods: {
    next () {
      if (!this.validEmail(this.email)) {
        this.error = 'Ingrese un correo electrónico válido.'
        this.$refs.input.focus()
        return
      }
      this.error = null
      this.$emit('next', this.email)
      // this.$router.push({ name: 'password' })
    },
    validEmail (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
  }
}
</script>

<style scoped>

</style>